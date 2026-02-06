import axios from "axios"
import { ACCESS_TOKEN } from "./constants"


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api/",
})

// Attach token if present
api.interceptors.request.use((config) => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Token ${token}`
    }
    return config
})

// Auth
export const register = (username, email, password) =>
    api.post('auth/register/', { username, email, password })

export const login = (username, password) =>
    api.post('auth/token/', { username, password })

// Posts
export const getPosts = (params) => api.get('posts/', { params })
export const getPost = (id) => api.get(`posts/${id}/`)
export const createPost = (data) => api.post('posts/', data)
export const updatePost = (id, data) => api.put(`posts/${id}/`, data)
export const deletePost = (id) => api.delete(`posts/${id}/`)
export const likePost = (id) => api.post(`posts/${id}/like/`)
export const savePost = (id) => api.post(`posts/${id}/save/`)

// Comments
export const getComments = (params) => api.get('comments/', { params })
export const createComment = (data) => api.post('comments/', data)

// Profiles
export const getProfiles = () => api.get('profiles/')
export const getProfile = (id) => api.get(`profiles/${id}/`)
export const getNotifications = () => api.get('notifications/')
export const markNotificationRead = (id) => api.post(`notifications/${id}/mark_read/`)
export const deleteNotification = (id) => api.delete(`notifications/${id}/`)

export default api