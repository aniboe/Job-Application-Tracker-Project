import React, { useState } from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch} from "react-redux"
import { addApplicationData } from '../../redux/slices/aplicationData.slice'
import { backendUrl } from '../../App' 

export function Login() {
  const userData = useSelector(userValue);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Safely redirect if already authenticated
  useEffect(() => {
    if (userData?.username) {
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  const fetchAppData = async () => {
    try {
      const [applicationsRes, userRes] = await Promise.all([
        axios.get(`/data/get-all-data`),
        axios.get(`/user/me`),
      ]);

      dispatch(addApplicationData(applicationsRes?.data));
      dispatch(addUserData(userRes?.data?.data));
    } catch (err) {
      console.error('Failed to sync data after login:', err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await axios.post(`/user/login`,
        {
          usernameOrEmail: username.trim().toLowerCase(),
          password: password,
        });

      await fetchAppData();
      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 px-4 py-8">
      <div className="w-full max-w-sm bg-white rounded-xl border border-zinc-200 shadow-sm p-8">
        {/* Brand / Title Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500 mt-1">
            Enter your credentials to access your tracker
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200/80 flex items-center gap-2 text-xs text-rose-700">
            <IoAlertCircle className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="e.g. alex@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-zinc-400 hover:text-zinc-600 transition-colors cursor-not-allowed"
                title="Password recovery is currently unavailable"
              >
                Forgot?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-9 w-full rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-2 text-zinc-400">or</span>
          </div>
        </div>



                <div className='flex-1 flex flex-col justify-around items-center'>
                    
                    <div className='border-2 border-zinc-400 text-zinc-400 font-bold px-3 py-1 rounded-xl hover:cursor-not-allowed'>
                        <button
                        disabled 
                            className='flex items-center gap-0.5 grayscale-100 hover:cursor-not-allowed' // remove grayscale when not working
                        >
                            <img 
                            className='h-5'
                            src="src\assets\icons8-google-logo-100.png" alt="" />
                            <h1>Google</h1>
                        </button>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-zinc-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-zinc-900 hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;