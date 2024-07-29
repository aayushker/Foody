import React from 'react'
import { useAuth }  from '@/app/AuthContext'

const Logout = () => {
  const { logout } = useAuth();
  return (
    <>
    <p className="text-black text-2xl font-semibold drop-shadow-md bg-clip-text animate-gradient">
        Logout 🚪
      </p>
      <p className="text-black text-md drop-shadow-md">
        Click the button below to logout. 👋
    </p>
    <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">
      Logout
    </button>
    </>
  )
}

export default Logout
