import React from 'react'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getUserData } from '@/app/fetchData';

const UserDashboard = () => {
  const [userData, setUserData] = useState<{ username: string } | null>(null);
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
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };
    fetchData();
  }, [router]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your Dashboard, {userData.username}</h1>
      <div>
        <a href="/dashboard/profile">Profile</a>
        <a href="/dashboard/settings">Settings</a>
        <a href="/dashboard/recipes">Recipes</a>
      </div>
    </div>
  );
}

export default UserDashboard
