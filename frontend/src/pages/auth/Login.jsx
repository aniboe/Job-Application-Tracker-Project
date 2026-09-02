import React, { useEffect, useState } from 'react';
import { api } from '../../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addApplicationData } from '../../redux/slices/aplicationData.slice.js';
import { addUserData, userValue } from '../../redux/slices/userData.slice.js';
import { IoAlertCircle } from "react-icons/io5";

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
        api.get(`/data/get-all-data`),
        api.get(`/user/me`),
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
      await api.post(`/user/login`, {
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
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-8 transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 shadow-sm p-8 transition-colors">
        {/* Brand / Title Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Welcome back
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            Enter your credentials to access your tracker
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400">
            <IoAlertCircle className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="e.g. alex@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Password
              </label>
              <button
                type="button"
                className="text-xs text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors cursor-not-allowed"
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
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-9 w-full rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-medium transition-colors shadow-xs cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-100 dark:border-zinc-800/80" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white dark:bg-zinc-950 px-2 text-zinc-400 dark:text-zinc-500 transition-colors">
              or
            </span>
          </div>
        </div>

        {/* Disabled Google Social Button */}
        <button
          type="button"
          disabled
          className="w-full h-9 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-center gap-2 text-xs font-medium text-zinc-400 dark:text-zinc-500 cursor-not-allowed select-none transition-colors"
        >
          <svg className="h-3.5 w-3.5 opacity-40" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            className="font-medium text-zinc-900 dark:text-zinc-200 hover:underline underline-offset-4"
          >
            Create one
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;