import React from 'react';

const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200/60 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/60',
  Interview: 'bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/60',
  Offer: 'bg-purple-50 text-purple-700 border-purple-200/60 dark:bg-purple-950/40 dark:text-purple-400 dark:border-purple-900/60',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/60',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/60',
};

function RecentAplication({ applicationData }) {
  const statusClass =
    STATUS_STYLES[applicationData?.status] ||
    'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:border-zinc-800';

  return (
    <div className="grid grid-cols-12 gap-4 items-center px-5 py-3 hover:bg-zinc-50/75 dark:hover:bg-zinc-900/50 transition-colors">
      {/* Role & Company */}
      <div className="col-span-5 flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-sm font-semibold text-zinc-700 dark:text-zinc-200 shrink-0 select-none transition-colors">
          {applicationData?.companyName?.charAt(0).toUpperCase() || 'C'}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
            {applicationData?.role || 'Untitled Role'}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {applicationData?.companyName || 'Unknown Company'}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="col-span-3 text-sm text-zinc-600 dark:text-zinc-300 truncate">
        {applicationData?.location || '—'}
      </div>

      {/* Date */}
      <div className="col-span-2 text-xs text-zinc-400 dark:text-zinc-500">
        {applicationData?.createdAt?.slice(0, 10) || '—'}
      </div>

      {/* Status Badge */}
      <div className="col-span-2 flex justify-end">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}
        >
          {applicationData?.status || 'Draft'}
        </span>
      </div>
    </div>
  );
}

export default RecentAplication;