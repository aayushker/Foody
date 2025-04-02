import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/AuthContext';
import SkeletonLoader from '@/app/components/ui/SkeletonLoader';

const Logout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      setError('');
      await logout();
      router.push('/login');
    } catch (err) {
      setError('Failed to logout. Please try again.');
      console.error('Logout error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <SkeletonLoader type="text" count={3} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Logout</h1>
      
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Are you sure you want to logout?</h2>
        <p className="text-gray-600 mb-6">
          You will be signed out of your account and redirected to the login page.
        </p>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
            disabled={isLoading}
          >
            {isLoading ? 'Logging out...' : 'Logout'}
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Before you go</h3>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Your saved recipes and preferences will be preserved</li>
          <li>You can log back in anytime using your credentials</li>
          <li>Make sure to save any unsaved changes before logging out</li>
        </ul>
      </div>
    </div>
  );
};

export default Logout;
