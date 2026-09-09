import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, MOCK_ROLES } from '../services/authService.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(() => authService.getSession());
  const [isLoading, setIsLoading] = useState(false);

  // Sync state if session in localStorage changes
  useEffect(() => {
    const current = authService.getSession();
    if (current && (!session || current.token !== session.token)) {
      setSession(current);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const newSession = await authService.login(credentials);
      setSession(newSession);
      return newSession;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const demoLogin = useCallback(async (roleName) => {
    setIsLoading(true);
    try {
      const newSession = await authService.demoLogin(roleName);
      setSession(newSession);
      return newSession;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const switchRole = useCallback((roleName) => {
    const newSession = authService.switchRole(roleName);
    setSession(newSession);
    return newSession;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setSession(null);
  }, []);

  const value = {
    session,
    user: session?.user || null,
    role: session?.role || null,
    isAuthenticated: !!session,
    isLoading,
    login,
    demoLogin,
    switchRole,
    logout,
    rolesMeta: MOCK_ROLES,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
