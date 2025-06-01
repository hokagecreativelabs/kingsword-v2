'use client';
import { createContext, useContext, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, error: data.message || 'Login failed' };
      }

      setAdmin(data.admin);
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Something went wrong' };
    }
  };

  const logout = async () => {
    await fetch('/api/admin/logout');
    setAdmin(null);
  };

  return (
    <AdminContext.Provider value={{ admin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
};
