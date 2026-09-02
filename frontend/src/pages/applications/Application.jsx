import React, { useMemo, useState } from 'react';
import { useSelector } from "react-redux";
import { allAplications } from '../../redux/slices/aplicationData.slice.js';

import { LuSearch, LuPlus } from "react-icons/lu";
import ApplicationCard from './card/ApplicationCard.jsx';
import NewApplication from './card/NewApplication.jsx';
import ApplicationPopup from './card/ApplicationPopup.jsx';
import EditApplication from './card/EditApplication.jsx';
import DeleteWarning from './card/DeleteWarning.jsx';

function Application() {
  const applicationData = useSelector(allAplications) || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const [addApplication, setAddApplication] = useState(false);
  const [showApplication, setShowApplication] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState({});
  const [editApplication, setEditApplication] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

  // Client-side search and status filtering
  const filteredApplications = useMemo(() => {
    return applicationData
      .slice()
      .reverse()
      .filter((item) => {
        const matchesStatus = statusFilter === 'All' || item?.status?.toLowerCase() === statusFilter.toLowerCase();
        const matchesSearch = 
          item?.role?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item?.location?.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesStatus && matchesSearch;
      });
  }, [applicationData, searchTerm, statusFilter]);

  return (
    <>
      <div className="flex flex-col w-full h-full gap-4">
        {/* Action Header: Search, Filter, Add */}
        <div className="flex items-center justify-between gap-3">
          {/* Search Input */}
          <div className="flex items-center bg-white border border-zinc-200 rounded-lg px-3 py-2 w-full max-w-sm shadow-sm focus-within:border-zinc-400 transition-colors">
            <LuSearch className="text-zinc-400 text-lg shrink-0" />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search applications..."
              className="w-full bg-transparent outline-none text-sm text-zinc-700 placeholder:text-zinc-400 pl-2.5"
            />
          </div>

          {/* Filter & Actions */}
          <div className="flex items-center gap-2.5">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-9 px-3 bg-white border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 outline-none hover:border-zinc-300 focus:border-zinc-400 transition-colors shadow-sm cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button 
              type="button"
              onClick={() => setAddApplication(true)}
              className="h-9 px-3.5 flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-sm font-medium shadow-sm transition-colors cursor-pointer"
            >
              <LuPlus className="text-base" />
              <span>New</span>
            </button>
          </div>
        </div>

        {/* Applications Table / List Container */}
        <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm flex-1 flex flex-col min-h-0">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-zinc-100 bg-zinc-50/75 text-xs font-semibold uppercase tracking-wider text-zinc-500 select-none">
            <span className="col-span-5">Role & Company</span>
            <span className="col-span-3">Location</span>
            <span className="col-span-2">Salary</span>
            <span className="col-span-2 text-right">Status</span>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-100">
            {filteredApplications.length > 0 ? (
              filteredApplications.map((value) => (
                <ApplicationCard 
                  key={value._id}
                  cardData={value}
                  setSelectedApplication={setSelectedApplication}
                  applicationData={value}
                  setEditApplication={setEditApplication}
                  setShowDeleteWarning={setShowDeleteWarning}
                  onClick={() => {
                    setShowApplication(true);
                    setSelectedApplication(value);
                  }}
                />
              ))
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-zinc-400 text-sm">
                No applications found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Dialogs */}
      {addApplication && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setAddApplication(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
            <NewApplication setAddApplication={setAddApplication} />
          </div>
        </div>
      )}

      {showApplication && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowApplication(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
            <ApplicationPopup 
              selectedApplication={selectedApplication} 
              setEditApplication={setEditApplication} 
              setSetshowApplication={setShowApplication}
              setShowDeleteWarning={setShowDeleteWarning}
            />
          </div>
        </div>
      )}

      {editApplication && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setEditApplication(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg">
            <EditApplication 
              selectedApplication={selectedApplication} 
              setEditApplication={setEditApplication} 
              setSetshowApplication={setShowApplication}
              showApplication={showApplication}
              setSelectedApplication={setSelectedApplication}
            />
          </div>
        </div>
      )}

      {showDeleteWarning && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowDeleteWarning(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md">
            <DeleteWarning 
              selectedApplication={selectedApplication} 
              setShowDeleteWarning={setShowDeleteWarning}  
              setSetshowApplication={setShowApplication}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Application;