"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  level: number;
  xp: number;
  coins: number;
  streak: number;
  bestStreak: number;
  totalStudyDays: number;
  planType?: string;
  image?: string;
}

interface UserContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<User | null>;
  updateUser: (userData: Partial<User>) => Promise<User | null>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'GET',
        cache: 'no-store',
      });

      if (response.status === 401) {
        setUser(null);
        return null;
      }

      const json = await response.json();
      const nextUser = json.data ?? null;
      setUser(nextUser);
      return nextUser;
    } catch (error) {
      console.error('Failed to fetch user:', error);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshUser();
  }, []);

  const updateUser = async (userData: Partial<User>) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.status === 401) {
        setUser(null);
        return null;
      }

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.error || 'Failed to update user profile');
      }

      if (json.data) {
        setUser(json.data);
        return json.data;
      }

      return null;
    } catch (error) {
      console.error('Failed to update user:', error);
      throw error instanceof Error ? error : new Error('Failed to update user profile');
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, refreshUser, updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
