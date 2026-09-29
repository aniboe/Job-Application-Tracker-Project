import React, { useEffect, useState } from 'react';
import { api } from '../../main.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addApplicationData } from '../../redux/slices/aplicationData.slice.js';
import { addUserData, userValue } from '../../redux/slices/userData.slice.js';
import { IoAlertCircle } from "react-icons/io5";
import GoogleAuth from './GoogleAuthBtn.jsx';

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


  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await api.post(`/user/login`, {
        usernameOrEmail: username.trim().toLowerCase(),
        password: password,
      });

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

        {/* Google Button */}
        <GoogleAuth/>

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