import React, { useState } from 'react';
import { api } from '../../../main.jsx';
import { useSelector, useDispatch } from "react-redux";
import { allAplications, addApplicationData } from '../../../redux/slices/aplicationData.slice.js';
import { LuTrash2 } from 'react-icons/lu';
import { TbAlertTriangleFilled } from "react-icons/tb";

function DeleteWarning({ selectedApplication, setShowDeleteWarning, setSetshowApplication }) {
  const dispatch = useDispatch();
  const reduxApplicationData = useSelector(allAplications) || [];
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await api.delete(`/data/delete-application/${selectedApplication._id}`)

      const updatedState = reduxApplicationData.filter(
        (val) => val._id !== selectedApplication._id
      );

      dispatch(addApplicationData(updatedState));

      if (setSetshowApplication) setSetshowApplication(false);
      setShowDeleteWarning(false);
    } catch (error) {
      console.error("Failed to delete application:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Icon & Title */}
      <div className="flex flex-col items-center text-center">
        <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
          <TbAlertTriangleFilled size={20} />
        </div>

        <h2 className="text-base font-semibold text-zinc-900 leading-tight">
          Delete Application
        </h2>

        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
          Are you sure you want to delete your application for{' '}
          <span className="font-medium text-zinc-800">
            {selectedApplication?.companyName || 'this company'}
          </span>
          ? This action cannot be undone.
        </p>
      </div>

      {/* Actions */}
      <div className="mt-6 flex items-center gap-2.5">
        <button
          type="button"
          disabled={loading}
          onClick={() => setShowDeleteWarning(false)}
          className="flex-1 px-4 py-2 text-xs font-medium text-zinc-700 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={handleConfirmDelete}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
        >
          <LuTrash2 size={13} />
          <span>{loading ? 'Deleting...' : 'Delete'}</span>
        </button>
      </div>
    </div>
  );
}

export default DeleteWarning;