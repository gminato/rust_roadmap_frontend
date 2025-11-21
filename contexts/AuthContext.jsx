import React, { createContext, useState, useContext, useEffect, useRef } from 'react';

const AuthContext = createContext(null);

// Global flag to prevent multiple Google One Tap initializations across re-renders
let googleOneTapInitialized = false;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const initializationAttempted = useRef(false);

  // Helper function to refresh access token using refresh token
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const authUrl = import.meta.env.VITE_AUTH_API_URL;
    try {
      const res = await fetch(`${authUrl}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
      } else {
        // Refresh token is invalid, user needs to login again
        throw new Error('Refresh token expired');
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear all auth data and force re-login
      logout();
      throw error;
    }
  };

  // Wrapper for authenticated API calls with auto token refresh
  const authenticatedFetch = async (url, options = {}) => {
    let token = localStorage.getItem('accessToken');
    
    // Add Authorization header
    const fetchOptions = {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    let response = await fetch(url, fetchOptions);

    // If 401, try to refresh token and retry
    if (response.status === 401) {
      console.log('Token expired, attempting refresh...');
      try {
        token = await refreshAccessToken();
        // Retry with new token
        fetchOptions.headers['Authorization'] = `Bearer ${token}`;
        response = await fetch(url, fetchOptions);
      } catch (refreshError) {
        console.error('Failed to refresh token, user needs to re-login');
        throw refreshError;
      }
    }

    return response;
  };

  const handleCredentialResponse = async (response) => {
    const googleToken = response.credential;
    const authUrl = import.meta.env.VITE_AUTH_API_URL;
    const backendUrl = import.meta.env.VITE_BACKEND_API_URL;

    try {
      // Step 1: Authenticate with Auth Microservice
      const res = await fetch(`${authUrl}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credential: googleToken }),
      });

      if (res.ok) {
        const data = await res.json();
        // Store tokens securely
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        
        // Step 2: Fetch user profile from Progress Service backend
        try {
          const userRes = await authenticatedFetch(`${backendUrl}/user/me`);

          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
            localStorage.setItem('rust_roadmap_user', JSON.stringify(userData));
            console.log('Logged in as:', userData.email);
          } else {
            // Fallback to auth microservice user data if backend fails
            setUser(data.user);
            localStorage.setItem('rust_roadmap_user', JSON.stringify(data.user));
            console.warn('Backend /user/me failed, using auth microservice data');
          }
        } catch (backendError) {
          console.error('Backend sync error:', backendError);
          // Fallback to auth microservice user data
          setUser(data.user);
          localStorage.setItem('rust_roadmap_user', JSON.stringify(data.user));
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Prevent double initialization in React Strict Mode
    if (initializationAttempted.current) {
      return;
    }
    initializationAttempted.current = true;

    // Validate token and fetch fresh user data on load
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('rust_roadmap_user');
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (savedUser && (accessToken || refreshToken)) {
        // We have a saved session, try to validate it
        const backendUrl = import.meta.env.VITE_BACKEND_API_URL;
        
        try {
          const userRes = await authenticatedFetch(`${backendUrl}/user/me`);
          
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
            localStorage.setItem('rust_roadmap_user', JSON.stringify(userData));
          } else {
            // Token is invalid, clear session
            console.warn('Session invalid, clearing auth data');
            logout();
          }
        } catch (error) {
          console.error('Failed to validate session:', error);
          // If validation fails, use saved user but they'll need to re-login on next API call
          setUser(JSON.parse(savedUser));
        }
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    // Only initialize Google One Tap once globally
    const initializeGoogleOneTap = () => {
      if (window.google && !googleOneTapInitialized) {
        googleOneTapInitialized = true;
        
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleCredentialResponse,
            auto_select: false,
            cancel_on_tap_outside: true,
            use_fedcm_for_prompt: true,
          });
          setIsGoogleReady(true);
          
          // Don't auto-prompt to avoid "Not signed in" errors
        } catch (error) {
          console.error('Google One Tap initialization error:', error);
        }
      }
    };

    if (window.google) {
      initializeGoogleOneTap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initializeGoogleOneTap;
      
      // Only append if not already present
      if (!document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        document.head.appendChild(script);
      }
    }
  }, []);

  const login = () => {
    if (window.google) {
      // Reset initialization flag to allow re-prompting if needed
      // googleOneTapInitialized = false; // Don't reset global flag, just prompt
      
      // Explicitly prompt for login
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed()) {
          console.log("One Tap not displayed:", notification.getNotDisplayedReason());
          // Fallback to standard OAuth popup if One Tap fails/is suppressed
          // Note: You might want to implement a standard OAuth popup flow here as fallback
          // or instruct user to check cookie settings
        } else if (notification.isSkippedMoment()) {
          console.log("One Tap skipped:", notification.getSkippedReason());
        }
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rust_roadmap_user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (window.google) {
      window.google.accounts.id.disableAutoSelect();
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, authenticatedFetch, isGoogleReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);