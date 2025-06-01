// app/admin/layout.jsx
'use client';

import { AdminProvider } from '../../context/AdminContext';

export default function AdminLayout({ children }) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}
