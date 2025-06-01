'use client';
import { useAdmin } from '../../contexts/AdminContext';

const AdminHeader = () => {
  const { user } = useAdmin();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Welcome, {user?.email}
          </span>
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;