import React, { useState } from 'react';
import { api } from '../../../main.jsx';
import { getApplications } from '../../../App.jsx';
import { useDispatch } from 'react-redux';
import { LuX } from 'react-icons/lu';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Accepted', 'Rejected'];

const STATUS_ACTIVE_STYLES = {
  Applied: 'bg-blue-50 text-blue-700 border-blue-300 ring-1 ring-blue-300',
  Interview: 'bg-amber-50 text-amber-700 border-amber-300 ring-1 ring-amber-300',
  Offer: 'bg-purple-50 text-purple-700 border-purple-300 ring-1 ring-purple-300',
  Accepted: 'bg-emerald-50 text-emerald-700 border-emerald-300 ring-1 ring-emerald-300',
  Rejected: 'bg-rose-50 text-rose-700 border-rose-300 ring-1 ring-rose-300',
};

function NewApplication({ setAddApplication }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    role: '',
    location: '',
    salaryRange: '',
    companyLink: '',
    status: 'Applied',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/data/create-application`,
        {
          companyName: formData.companyName.trim(),
          role: formData.role.trim(),
          location: formData.location.trim(),
          salaryRange: formData.salaryRange.trim(),
          companyLink: formData.companyLink.trim(),
          status: formData.status,
        });
      getApplications(dispatch);
      setAddApplication(false);
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-lg"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 leading-tight">
            New Application
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Add a new job application to track
          </p>
        </div>
        <button
          type="button"
          onClick={() => setAddApplication(false)}
          className="p-1.5 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer"
          title="Close"
        >
          <LuX size={18} />
        </button>
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
        {/* Company & Role Row */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Company</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="e.g. Frontend Engineer"
            />
          </div>
        </div>

        {/* Location & Salary Row */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="e.g. Remote / New York"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700">Salary Range</label>
            <input
              type="text"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
              placeholder="e.g. $120k - $140k"
            />
          </div>
        </div>

        {/* Company Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700">Company Website / Job URL</label>
          <input
            type="url"
            value={formData.companyLink}
            onChange={(e) => setFormData({ ...formData, companyLink: e.target.value })}
            className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
            placeholder="https://..."
          />
        </div>

        {/* Status Selection Chips */}
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="text-xs font-medium text-zinc-700">Status</label>
          <div className="flex flex-wrap gap-1.5">
            {STATUS_OPTIONS.map((status) => {
              const isSelected = formData.status === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFormData({ ...formData, status })}
                  className={`px-3 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? STATUS_ACTIVE_STYLES[status]
                      : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100 hover:text-zinc-900'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-4 mt-2 border-t border-zinc-100">
          <button
            type="button"
            disabled={loading}
            onClick={() => setAddApplication(false)}
            className="px-4 py-2 text-xs font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Application'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewApplication;