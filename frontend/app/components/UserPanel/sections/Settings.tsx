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
    <div>
      <h1>Update Credentials</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Credentials</button>
      </form>
    </div>
  );
};

export default Settings;
