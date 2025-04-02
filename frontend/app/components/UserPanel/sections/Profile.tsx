import { useEffect, useState } from 'react';
import { getUserData, updateProfile } from '@/app/fetchData';
import { useRouter } from 'next/router';
import SkeletonLoader from '@/app/components/ui/SkeletonLoader';

interface ProfileData {
  full_name: string;
  profile_picture: string;
  bio?: string;
  email?: string;
}

const Profile = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    full_name: '',
    profile_picture: '',
    bio: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const data = await getUserData(token);
        if (!data || !data.profile) {
          throw new Error('Invalid profile data received');
        }
        
        setProfileData({
          full_name: data.profile?.full_name || '',
          profile_picture: data.profile?.profile_picture || '',
          bio: data.profile?.bio || '',
          email: data.email || ''
        });
      } catch (error) {
        console.error('Error fetching profile data', error);
        setErrorMessage('Failed to load profile data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const token = localStorage.getItem('token');
    if (!token) {
      setErrorMessage('Authentication token not found. Please log in again.');
      setIsLoading(false);
      return;
    }

    try {
      await updateProfile(token, profileData);
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile', error);
      setErrorMessage('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <SkeletonLoader type="profile-card" count={1} />
        <div className="mt-6">
          <SkeletonLoader type="text" count={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Profile Settings</h1>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={profileData.full_name}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profileData.bio}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
            Profile Picture URL
          </label>
          <input
            type="url"
            id="profile_picture"
            name="profile_picture"
            value={profileData.profile_picture}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {profileData.profile_picture && (
            <div className="mt-2">
              <img
                src={profileData.profile_picture}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
