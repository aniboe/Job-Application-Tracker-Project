import React from 'react';
import { LuPencil, LuTrash2 } from 'react-icons/lu';

// Minimal pill palette with soft backgrounds and matching foregrounds
const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200/60',
  Interview: 'bg-amber-50 text-amber-700 border-amber-200/60',
  Offer: 'bg-purple-50 text-purple-700 border-purple-200/60',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200/60',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
};

function ApplicationCard({
  applicationData,
  onClick,
  setShowDeleteWarning,
  cardData,
  setSelectedApplication,
  setEditApplication,
}) {
  const data = applicationData || cardData;
  const statusClass =
    STATUS_STYLES[data?.status] || 'bg-zinc-100 text-zinc-700 border-zinc-200';

  return (
    <div
      onClick={onClick}
      className="group grid grid-cols-12 gap-4 items-center px-5 py-3 hover:bg-zinc-50 transition-colors cursor-pointer"
    >
      {/* Role & Company */}
      <div className="col-span-5 flex items-center gap-3 min-w-0">
        <div className="h-9 w-9 rounded-lg bg-zinc-100 border border-zinc-200 flex items-center justify-center text-sm font-semibold text-zinc-700 shrink-0 select-none">
          {data?.companyName?.charAt(0).toUpperCase() || 'C'}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-900 truncate">
            {data?.role || 'Untitled Role'}
          </p>
          <p className="text-xs text-zinc-500 truncate">
            {data?.companyName || 'Unknown Company'}
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="col-span-3 text-sm text-zinc-600 truncate">
        {data?.location || '—'}
      </div>

      {/* Salary */}
      <div className="col-span-2 text-sm text-zinc-600 truncate">
        {data?.salaryRange || '—'}
      </div>

      {/* Status & Actions */}
      <div className="col-span-2 flex items-center justify-end gap-2">
        {/* Status Badge */}
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}
        >
          {data?.status || 'Draft'}
        </span>

        {/* Action Buttons (Subtle on hover) */}
        <div
          className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApplication(data);
              setEditApplication(true);
            }}
            className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-md transition-colors"
          >
            <LuPencil size={15} />
          </button>

          <button
            type="button"
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedApplication(data);
              setShowDeleteWarning(true);
            }}
            className="p-1.5 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
          >
            <LuTrash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationCard;