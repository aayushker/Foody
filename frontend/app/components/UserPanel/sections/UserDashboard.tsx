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
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-amber-800 mb-6 border-b pb-3">Welcome to your Dashboard, {userData.username}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <a 
        href="/dashboard/profile" 
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl hover:translate-y-[-5px] border-l-4 border-amber-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="font-medium text-gray-800 text-lg">Profile</span>
      </a>
      
      <a 
        href="/dashboard/settings" 
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl hover:translate-y-[-5px] border-l-4 border-amber-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        <span className="font-medium text-gray-800 text-lg">Settings</span>
      </a>
      
      <a 
        href="/dashboard/recipes" 
        className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md transition-all hover:shadow-xl hover:translate-y-[-5px] border-l-4 border-amber-500"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-amber-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <span className="font-medium text-gray-800 text-lg">Recipes</span>
      </a>
      </div>
    </div>
  );
}

export default UserDashboard
