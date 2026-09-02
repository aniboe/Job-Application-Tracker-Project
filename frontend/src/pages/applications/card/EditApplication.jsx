import React, { useState } from 'react';
import { api } from '../../../main.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { allAplications, addApplicationData } from '../../../redux/slices/aplicationData.slice.js';
import { LuX } from 'react-icons/lu';

const STATUS_OPTIONS = ['Applied', 'Interview', 'Offer', 'Accepted', 'Rejected'];

const STATUS_ACTIVE_STYLES = {
  Applied: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-800 ring-1 ring-blue-300 dark:ring-blue-800',
  Interview: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800 ring-1 ring-amber-300 dark:ring-amber-800',
  Offer: 'bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border-purple-300 dark:border-purple-800 ring-1 ring-purple-300 dark:ring-purple-800',
  Accepted: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800 ring-1 ring-emerald-300 dark:ring-emerald-800',
  Rejected: 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-300 dark:border-rose-800 ring-1 ring-rose-300 dark:ring-rose-800',
};

function EditApplication({
  selectedApplication,
  setEditApplication,
  setSetshowApplication,
  showApplication,
  setSelectedApplication,
}) {
  const dispatch = useDispatch();
  const reduxApplicationData = useSelector(allAplications) || [];

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyName: selectedApplication?.companyName || '',
    role: selectedApplication?.role || '',
    location: selectedApplication?.location || '',
    salaryRange: selectedApplication?.salaryRange || '',
    companyLink: selectedApplication?.companyLink || '',
    status: selectedApplication?.status || 'Applied',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        companyName: formData.companyName.trim(),
        role: formData.role.trim(),
        location: formData.location.trim(),
        salaryRange: formData.salaryRange.trim(),
        companyLink: formData.companyLink.trim(),
        status: formData.status,
      };

      await api.patch(`/data/update-application/${selectedApplication._id}`, payload);

      const updatedList = reduxApplicationData.map((val) => {
        if (val._id === selectedApplication._id) {
          const updated = { ...val, ...payload };
          setSelectedApplication(updated);
          return updated;
        }
        return val;
      });

      dispatch(addApplicationData(updatedList));
      setEditApplication(false);
      if (showApplication && setSetshowApplication) {
        setSetshowApplication(true);
      }
    } catch (error) {
      console.error('Error updating application:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditApplication(false);
    if (showApplication && setSetshowApplication) {
      setSetshowApplication(true);
    }
  };

  return (
    <div
      className="bg-white dark:bg-zinc-950 rounded-xl border border-zinc-200 dark:border-zinc-800/90 shadow-xl overflow-hidden w-full max-w-lg transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
            Edit Application
          </h2>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
            Update role and company information
          </p>
        </div>
        <button
          type="button"
          onClick={handleCancel}
          className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
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
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Company</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="e.g. Acme Corp"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="e.g. Frontend Engineer"
            />
          </div>
        </div>

        {/* Location & Salary Row */}
        <div className="grid grid-cols-2 gap-3.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="e.g. Remote / New York"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Salary Range</label>
            <input
              type="text"
              value={formData.salaryRange}
              onChange={(e) => setFormData({ ...formData, salaryRange: e.target.value })}
              className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
              placeholder="e.g. $120k - $140k"
            />
          </div>
        </div>

        {/* Website / Link */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Company Website / Job URL</label>
          <input
            type="url"
            value={formData.companyLink}
            onChange={(e) => setFormData({ ...formData, companyLink: e.target.value })}
            className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-sm text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors shadow-2xs"
            placeholder="https://..."
          />
        </div>

        {/* Status Selection Chips */}
        <div className="flex flex-col gap-1.5 pt-1">
          <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Status</label>
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
                      : 'bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-2.5 pt-4 mt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-white dark:text-zinc-950 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditApplication;