import { useState } from 'react';
import { loginUser } from '../api/user.api';

const LoginForm = ({state}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!email || !password) return setError('Email and Password are required');

    try {
      setLoading(true);
      await loginUser({ email, password });
      setSuccess('Logged in successfully');
      
    } catch (err) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6">
      <h2 className="text-lg text-center font-medium mb-3">Login</h2>
      <div className="space-y-3">
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
            onClick={handleSubmit}
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
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </div>

        <div className='text-center mt-4'>
          <p className='text-sm text-gray-600'>Don't have an accout? <span onClick={ () => state(false)} className='text-blue-500 hover:text-gray-200 cursor-pointer'>Register</span></p>
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}
        {success && <p className="text-sm text-green-400 text-center">{success}</p>}
      </div>
    </div>
  );
};

export default LoginForm;
