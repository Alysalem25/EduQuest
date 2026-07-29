/**
 * Secure API Client
 * Axios instance with JWT interceptors and error handling
 * 
 * Security Features:
 * - Automatically adds Authorization header with JWT
 * - Handles 401/403 errors (redirect to login)
 * - Centralized error handling
 * - Token refresh support (can be extended)
 * - Type-safe requests
 */

// import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";
// import { getAuthToken, clearAuthData } from "./auth";
// import { get } from "http";

// // Create axios instance with base URL
// const apiClient: AxiosInstance = axios.create({
//     baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
//     timeout: 10000,
//     headers: {
//         "Content-Type": "application/json"
//     }
// });

// /**
//  * Request Interceptor
//  * Automatically add JWT token to all requests
//  */
// apiClient.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//         const token = getAuthToken();
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error: AxiosError) => {
//         return Promise.reject(error);
//     }
// );

// /**
//  * Response Interceptor
//  * Handle authentication errors globally
//  */
// apiClient.interceptors.response.use(
//     (response) => response,
//     (error: AxiosError) => {
//         // Handle 401 Unauthorized (token expired or invalid)
//         if (error.response?.status === 401) {
//             clearAuthData();

//             // Only redirect in client-side (not during SSR)
//             // if (typeof window !== "undefined") {
//             //   window.location.href = "/login";
//             // }

//             return Promise.reject({
//                 ...error,
//                 message: "Session expired. Please log in again."
//             });
//         }

//         // Handle 403 Forbidden (insufficient permissions)
//         if (error.response?.status === 403) {
//             if (typeof window !== "undefined") {
//                 window.location.href = "/";
//             }

//             return Promise.reject({
//                 ...error,
//                 message: "You don't have permission to access this resource."
//             });
//         }

//         // Handle 404 Not Found
//         if (error.response?.status === 404) {
//             return Promise.reject({
//                 ...error,
//                 message: "Resource not found."
//             });
//         }

//         // Handle 400 Bad Request (validation errors)
//         if (error.response?.status === 400) {
//             const data = error.response.data as any;
//             return Promise.reject({
//                 ...error,
//                 message: data?.error || "Invalid request."
//             });
//         }

//         // Handle 500 Server Error
//         if (error.response?.status === 500) {
//             return Promise.reject({
//                 ...error,
//                 message: "Server error. Please try again later."
//             });
//         }

//         // Network error or timeout
//         if (!error.response) {
//             return Promise.reject({
//                 ...error,
//                 message: "Network error. Please check your connection."
//             });
//         }

//         return Promise.reject(error);
//     }
// );

import axios from "axios";
import { getAuthToken } from "./auth";

const apiClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// export default apiClient;

/**
 * API Methods with proper typing
 */
// export const api = {
//     auth: {
//         login: (data: { email: string; password: string }) =>
//             apiClient.post("/auth/login", data),

//         register: (data: RegisterData) =>
//             apiClient.post("/auth/register", data),

//         me: () =>
//             apiClient.get("/auth/me"),
//     },

//     tutors: {
//         getAll: () =>
//             apiClient.get("/tutors"),

//         getOne: (id: string) =>
//             apiClient.get(`/tutors/${id}`),

//         create: (data: TutorData) =>
//             apiClient.post("/tutors", data),

//         update: (id: string, data: Partial<TutorData>) =>
//             apiClient.put(`/tutors/${id}`, data),

//         delete: (id: string) =>
//             apiClient.delete(`/tutors/${id}`)
//     }
// };


export default apiClient;
