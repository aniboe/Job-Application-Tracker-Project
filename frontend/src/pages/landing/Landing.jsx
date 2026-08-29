import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowRight, LuLayoutDashboard, LuKanban, LuTrendingUp } from 'react-icons/lu';

function Landing() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="h-16 border-b border-zinc-200 bg-white px-6 sm:px-12 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-blue-600">
            L Tracker
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            Sign in
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            Get started
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-24 text-center flex flex-col items-center">
        {/* Subdued Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-medium mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
          <span>Job application workflow tracker</span>
        </div>

        {/* Main Pitch */}
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-zinc-900 leading-tight">
          Keep track of every submission, interview, and offer.
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 mt-4 max-w-xl leading-relaxed">
          A clean, distraction-free tracker designed to monitor your job applications,
          stages, and stats without the clutter.
        </p>

        {/* Primary CTA */}
        <div className="mt-8 flex items-center gap-3">
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            <span>Start Tracking Free</span>
            <LuArrowRight size={14} />
          </Link>
          <Link
            to="/login"
            className="px-5 py-2.5 bg-white border border-zinc-200 hover:bg-zinc-100 text-zinc-800 rounded-lg text-xs font-medium transition-colors shadow-2xs"
          >
            Go to Dashboard
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-16 w-full text-left">
          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center mb-3">
              <LuLayoutDashboard size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900">Application Pipeline</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Track roles from initial application through final accepted offers.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center mb-3">
              <LuKanban size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900">Kanban Board</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Visualize your pipeline stages in an intuitive drag-and-drop board.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-2xs">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-700 flex items-center justify-center mb-3">
              <LuTrendingUp size={16} />
            </div>
            <h3 className="text-xs font-semibold text-zinc-900">Activity Trends</h3>
            <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
              Inspect velocity and conversion rates across your job search.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-3">
        <p>© {new Date().getFullYear()} L Tracker. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hover:text-zinc-700 transition-colors">
            Login
          </Link>
          <Link to="/register" className="hover:text-zinc-700 transition-colors">
            Register
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Landing;