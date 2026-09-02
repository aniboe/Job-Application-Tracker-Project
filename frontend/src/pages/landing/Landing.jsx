import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuLayoutDashboard, LuKanban, LuTrendingUp } from 'react-icons/lu';

function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 flex flex-col justify-between transition-colors">
      {/* Navigation Header */}
      <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 sm:px-12 flex items-center justify-between transition-colors">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-blue-600 dark:text-blue-500">
            L Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Subdued Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/60 text-blue-700 dark:text-blue-400 text-xs font-medium mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-500" />
          <span>Job application workflow tracker</span>
        </div>

        {/* Main Pitch */}
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
          Keep track of every submission, interview, and offer.
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 mt-4 max-w-xl leading-relaxed">
          A clean, distraction-free tracker designed to monitor your job applications,
          stages, and stats without the clutter.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            <span>Start Tracking Free</span>
            <LuArrowRight size={14} />
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full text-left">
          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs transition-colors">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-3">
              <LuLayoutDashboard size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Application Pipeline</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Track roles from initial application through final accepted offers.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs transition-colors">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-3">
              <LuKanban size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Kanban Board</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Visualize your pipeline stages in an intuitive drag-and-drop board.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800 p-5 shadow-2xs transition-colors">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-3">
              <LuTrendingUp size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Activity Trends</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
              Inspect velocity and conversion rates across your job search.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-3 transition-colors">
        <p>© {new Date().getFullYear()} L Tracker. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
            Register
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Landing;