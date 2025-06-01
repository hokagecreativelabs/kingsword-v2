'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAdmin } from '../../contexts/AdminContext';

const AdminSidebar = () => {
  const pathname = usePathname();
  const { logout } = useAdmin();

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/users', label: 'Users', icon: '👥' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
                pathname === item.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <button
            onClick={logout}
            className="flex items-center space-x-3 px-4 py-2 w-full text-left text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
          >
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;