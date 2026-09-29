import React, { useEffect, useState } from 'react';
import { api } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUserData, userValue } from '../../redux/slices/userData.slice';
import { IoAlertCircle } from "react-icons/io5";
import GoogleAuthBtn from './GoogleAuthBtn';
import { addApplicationData } from '../../redux/slices/aplicationData.slice';

export function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector(userValue);

  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);





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
  
  
  

  // Safely redirect if already logged in
  useEffect(() => {
    if (userData?.username) {
      fetchAppData()
      navigate('/dashboard');
    }
  }, [userData, navigate]);

  // Step 1: Send OTP to email
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await api.post(`/user/send-otp`, {
        email: email.trim(),
      })
      // .then((data) => console.log(data.data))
      setStep('otp');
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Register
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!otp.trim()) {
      setError('Please enter the OTP');
      return;
    }

    setLoading(true);

    try {
      await api.post('/user/verify-otp', {
        email: email.trim(),
        otp: otp.trim(),
      });
      await api.post(`/user/register`, {
        username: username.trim().toLowerCase(),
        email: email.trim(),
        password: password,
      });

      await fetchAppData()

      navigate('/dashboard');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed. Please check the OTP and try again.');
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black px-4 py-8 transition-colors">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 shadow-sm p-8 transition-colors">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {step === 'details' ? 'Create an account' : 'Verify your email'}
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {step === 'details'
              ? 'Start tracking your job applications in one place'
              : `We sent a verification code to ${email}`}
          </p>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400">
            <IoAlertCircle className="text-base shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Details Form (Step 1) */}
        {step === 'details' ? (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
                placeholder="e.g. alexsmith"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
                placeholder="alex@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
                placeholder="••••••••"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
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
              {loading ? 'Sending code...' : 'Continue'}
            </button>
          </form>
        ) : (
          /* OTP Verification Form (Step 2) */
          <form onSubmit={handleVerifyAndRegister} className="flex flex-col gap-3.5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">One-Time Password</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                autoFocus
                maxLength={8}
                className="h-9 px-3 text-center tracking-widest text-base font-medium rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
                placeholder="123456"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 h-9 w-full rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 text-xs font-medium transition-colors shadow-xs cursor-pointer disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Register'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => {
                setStep('details');
                setError('');
              }}
              className="text-xs text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              Change details
            </button>
          </form>
        )}

        {/* Divider */}
        {step === 'details' && (
          <>
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
            <GoogleAuthBtn/>
          </>
        )}

        {/* Footer Link */}
        <div className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-zinc-900 dark:text-zinc-200 hover:underline underline-offset-4"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;