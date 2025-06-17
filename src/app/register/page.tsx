'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const register = async () => {
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert('Registration successful!');
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white"> Register </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Email </label>

          <input type="email" placeholder="example@email.com" value={email} autoComplete="off"
            onChange={(e) => setEmail(e.target.value)} className="border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-md p-2 w-full"/>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"> Password </label>
          <input type="password" placeholder="Enter password" value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-700 dark:bg-zinc-800 dark:text-white rounded-md p-2 w-full"/>
        </div>

        <button onClick={register} className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md transition mb-3"> Register</button>

        <button onClick={() => router.push('/login')} className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-center">
          Already have an account? Login
        </button>
      </div>
    </div>
  );
}
