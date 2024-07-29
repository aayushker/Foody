import { useEffect, useState } from 'react';
import { getUserData, updateProfile } from '@/app/fetchData';
import { useRouter } from 'next/router';
import axios from 'axios';

const Profile = () => {
  const [profileData, setProfileData] = useState({
    full_name: '',
    profile_picture: ''
  });
  const [isLoading, setIsLoading] = useState(true);
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
        setProfileData({
          full_name: data.profile.full_name,
          profile_picture: data.profile.profile_picture
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching profile data', error);
      }
    };
    fetchData();
  }, [router]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const updatedProfile = await updateProfile(token, profileData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Update Profile</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            name="full_name"
            value={profileData.full_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Profile Picture</label>
          <input
            type="text"
            name="profile_picture"
            value={profileData.profile_picture}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
