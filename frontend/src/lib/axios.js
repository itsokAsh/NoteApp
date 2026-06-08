import axios from "axios"

// Use VITE_API_URL environment variable; fallback to localhost for development
const Base_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api"
const api = axios.create({
    baseURL: Base_URL
})
export default api