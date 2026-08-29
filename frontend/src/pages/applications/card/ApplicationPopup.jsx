import React from 'react';
import { LuExternalLink, LuPencil, LuTrash2, LuX } from 'react-icons/lu';

const STATUS_STYLES = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-200/60',
  Interview: 'bg-amber-50 text-amber-700 border-amber-200/60',
  Offer: 'bg-purple-50 text-purple-700 border-purple-200/60',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-200/60',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
};

function ApplicationPopup({
  selectedApplication,
  setEditApplication,
  setSetshowApplication,
  setShowDeleteWarning,
}) {
  const statusClass =
    STATUS_STYLES[selectedApplication?.status] ||
    'bg-zinc-100 text-zinc-700 border-zinc-200';

  return (
    <div
      className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b border-zinc-100 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 leading-tight">
            {selectedApplication?.role || 'Untitled Role'}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            Applied on {selectedApplication?.createdAt?.slice(0, 10) || '—'}
          </p>
        </div>

        {/* Close Modal Button */}
        <button
          type="button"
          onClick={() => setSetshowApplication(false)}
          className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
          title="Close"
        >
          <LuX size={18} />
        </button>
      </div>

      {/* Details List */}
      <div className="px-6 py-4 divide-y divide-zinc-100">
        {/* Company Name */}
        <div className="py-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500 font-normal">Company</span>
          <span className="text-zinc-800 font-medium">
            {selectedApplication?.companyName || '—'}
          </span>
        </div>

        {/* Location */}
        <div className="py-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500 font-normal">Location</span>
          <span className="text-zinc-800 font-medium">
            {selectedApplication?.location || '—'}
          </span>
        </div>

        {/* Salary */}
        <div className="py-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500 font-normal">Salary Range</span>
          <span className="text-zinc-800 font-medium">
            {selectedApplication?.salaryRange || '—'}
          </span>
        </div>

        {/* Status */}
        <div className="py-3 flex items-center justify-between text-sm">
          <span className="text-zinc-500 font-normal">Status</span>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusClass}`}
          >
            {selectedApplication?.status || 'Draft'}
          </span>
        </div>

        {/* Company Link */}
        {selectedApplication?.companyLink && (
          <div className="py-3 flex items-center justify-between text-sm">
            <span className="text-zinc-500 font-normal">Website</span>
            <a
              href={selectedApplication.companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-zinc-800 hover:text-zinc-950 font-medium underline underline-offset-4 decoration-zinc-300 hover:decoration-zinc-800 transition-colors max-w-55 truncate"
            >
              <span className="truncate">{selectedApplication.companyLink.replace(/^https?:\/\//, '')}</span>
              <LuExternalLink size={14} className="shrink-0 text-zinc-400" />
            </a>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 bg-zinc-50/75 border-t border-zinc-100 flex items-center justify-between">
        <button
          type="button"
          onClick={() => {
            setShowDeleteWarning(true);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
        >
          <LuTrash2 size={15} />
          <span>Delete</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSetshowApplication(false)}
            className="px-3.5 py-1.5 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-200/60 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              setEditApplication(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <LuPencil size={13} />
            <span>Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplicationPopup;