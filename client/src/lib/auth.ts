// /**
//  * Authentication Storage Utilities
//  * 
//  * Handles JWT token and user data persistence
//  * Uses localStorage for demo - in production, consider httpOnly cookies
//  * 
//  * Security Notes:
//  * - localStorage is vulnerable to XSS, but we're using it here for simplicity
//  * - Ideally, tokens should be in httpOnly cookies (server-set only)
//  * - Never store sensitive data beyond the token
//  * - Always validate tokens server-side
//  */

// const AUTH_TOKEN_KEY = process.env.NEXT_PUBLIC_AUTH_TOKEN_KEY || "auth_token";
// const AUTH_USER_KEY = process.env.NEXT_PUBLIC_AUTH_USER_KEY || "auth_user";

// // Type definitions for TypeScript
// export interface AuthUser {
//     _id: string;
//     name: string;
//     email: string;
//     title: string;
//     avatar: string;
//     verified: boolean;
// }

// export interface AuthResponse {
//     message: string;
//     token: string;
//     user: AuthUser;
// }

// /**
//  * Save authentication token and user data
//  */
// export const saveAuthData = (token: string, user: AuthUser): void => {
//   if (typeof window === "undefined") return; // SSR check
  
//   localStorage.setItem(AUTH_TOKEN_KEY, token);
//   localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
// };

// /**
//  * Retrieve authentication token
//  */
// export const getAuthToken = (): string | null => {
//   if (typeof window === "undefined") return null; // SSR check
  
//   return localStorage.getItem(AUTH_TOKEN_KEY);
// };

// /**
//  * Retrieve user data
//  */
// export const getAuthUser = (): AuthUser | null => {
//   if (typeof window === "undefined") return null; // SSR check
  
//   const userStr = localStorage.getItem(AUTH_USER_KEY);
//   if (!userStr) return null;
  
//   try {
//     return JSON.parse(userStr);
//   } catch {
//     return null;
//   }
// };

// /**
//  * Check if user is authenticated
//  */
// export const isAuthenticated = (): boolean => {
//   return !!getAuthToken();
// };



// /**
//  * Clear authentication data (logout)
//  */
// export const clearAuthData = (): void => {
//   if (typeof window === "undefined") return; // SSR check
  
//   localStorage.removeItem(AUTH_TOKEN_KEY);
//   localStorage.removeItem(AUTH_USER_KEY);
// };

// /**
//  * Get Authorization header for API requests
//  */
// export const getAuthHeader = (): Record<string, string> => {
//   const token = getAuthToken();
//   if (!token) return {};
  
//   return {
//     Authorization: `Bearer ${token}`
//   };
// };

// /**
//  * Decode JWT token (client-side only for checking expiration)
//  * Note: This is NOT validated - always validate on server
//  */
// export const decodeToken = (token: string): Record<string, any> | null => {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (err) {
//     return null;
//   }
// };

// /**
//  * Check if token is expired
//  * Used for client-side UX optimization
//  * Server-side validation is ALWAYS enforced
//  */
// export const isTokenExpired = (): boolean => {
//   if (typeof window === "undefined") return true;
  
//   const token = localStorage.getItem(AUTH_TOKEN_KEY);
//   if (!token) return true;
  
//   try {
//     const payload = decodeToken(token);
//     if (!payload || !payload.exp) return true;
    
//     const expirationTime = payload.exp * 1000; // Convert to milliseconds
//     const currentTime = Date.now();
    
//     return currentTime > expirationTime;
//   } catch (error) {
//     console.error("Token expiration check failed:", error);
//     return true;
//   }
// };

// /**
//  * Get time remaining on token (in seconds)
//  * Returns 0 if no token or expired
//  */
// export const getTokenTimeRemaining = (): number => {
//   const token = getAuthToken();
//   if (!token) return 0;

//   const decoded = decodeToken(token);
//   if (!decoded || !decoded.exp) return 0;

//   const currentTime = Date.now() / 1000;
//   const remaining = decoded.exp - currentTime;
//   return remaining > 0 ? remaining : 0;
// };


const TOKEN_KEY = "token";
const USER_KEY = "user";

export const saveAuthData = (token: string, user: any) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getAuthUser = () => {
  const user = localStorage.getItem(USER_KEY);

  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};