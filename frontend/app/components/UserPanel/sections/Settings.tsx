import { useEffect, useState } from 'react';
import { updateCredentials } from '@/app/fetchData';
import { useRouter } from 'next/router';
import axios from 'axios';

const Settings = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const updatedCredentials = await updateCredentials(token, credentials);
      alert('Credentials updated successfully');
    } catch (error) {
      console.error('Error updating credentials', error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Update Credentials</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        placeholder="Enter your email"
        required
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        placeholder="Enter your new password"
        required
        />
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
      >
        Update Credentials
      </button>
      </form>
    </div>
  );
};

export default Settings;
