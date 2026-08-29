import React from 'react';

const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200/60',
  Interview: 'bg-amber-50 text-amber-700 border-amber-200/60',
  Offer: 'bg-purple-50 text-purple-700 border-purple-200/60',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200/60',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
};

function RecentAplication({ applicationData }) {
  const statusClass =
    STATUS_STYLES[applicationData?.status] ||
    'bg-zinc-100 text-zinc-700 border-zinc-200';

  return (
    <div className="grid grid-cols-12 gap-4 items-center px-5 py-3 hover:bg-zinc-50/75 transition-colors">
      {/* Role & Company */}
      <div className="col-span-5 flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-sm font-semibold text-zinc-700 shrink-0 select-none">
          {applicationData?.companyName?.charAt(0).toUpperCase() || 'C'}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900 truncate">
            {applicationData?.role || 'Untitled Role'}
          </p>
          <p className="text-xs text-zinc-500 truncate">
            {applicationData?.companyName || 'Unknown Company'}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="col-span-3 text-sm text-zinc-600 truncate">
        {applicationData?.location || '—'}
      </div>

      {/* Date */}
      <div className="col-span-2 text-xs text-zinc-400">
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