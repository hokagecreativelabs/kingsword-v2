'use client';
import { useAdmin } from '../../contexts/AdminContext';
import AdminLogin from './AdminLogin';

const AdminGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return children;
};

export default AdminGuard;