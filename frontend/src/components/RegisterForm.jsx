import React, { useState } from 'react';
import { registerUser } from '../api/user.api';

const RegisterForm = ({state}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () =>   {
    setError(null);
    setSuccess(null);
    if (!name || !email || !password) return setError('All fields are required');

    try {
      setLoading(true);
      await registerUser({ name, email, password });
      setSuccess('Registered successfully. You can now log in.');
      setName(''); setEmail(''); setPassword('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg text-center font-medium mb-3">Register</h2>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-300">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-[rgba(255,255,255,0.03)] border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-[rgba(255,255,255,0.03)] border border-gray-700"
          />
        </div>

        <div>
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 p-2 rounded bg-[rgba(255,255,255,0.03)] border border-gray-700"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            onClick={handleSubmit}
            className="px-8 py-2 bg-indigo-600 text-white rounded disabled:opacity-60"
          >
            {loading ? 'Registering... ' : 'Register'}
          </button>
        </div>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600 '>Already have an accout? <span onClick={ () => state(true)} className='text-blue-500 hover:text-gray-200 cursor-pointer'>Login</span></p>
        </div>

        {error && <p className="text-sm text-center text-red-400">{error}</p>}
        {success && <p className="text-sm text-center text-green-400">{success}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
