import React from 'react';
import { Link } from 'react-router-dom';
import { LuArrowLeft } from 'react-icons/lu';

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-black px-4 transition-colors">
      <div className="w-full max-w-sm text-center flex flex-col items-center">
        {/* Error Code */}
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
          404 Error
        </span>

        {/* Heading & Subtext */}
        <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight mt-2">
          Page not found
        </h1>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Back Link Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-950 rounded-lg text-xs font-medium transition-colors shadow-xs"
        >
          <LuArrowLeft size={14} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;