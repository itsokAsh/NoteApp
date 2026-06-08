import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
     try {
        // Use client IP as the rate limit key (per-IP limiting)
        const clientIp = req.ip || req.connection.remoteAddress || "unknown";
        const {success} = await ratelimit.limit(clientIp);

        if(!success){
            return res.status(429).json({ message: "Too many requests, please try again later." });
        }
        next();
     } catch (error) {
        console.error("Error in rate limiter middleware:", error);
        // On connection error, allow the request (fail-open) to prevent total service failure
        console.warn("Rate limiter unavailable, allowing request");
        next();
     }
}

export default rateLimiter;