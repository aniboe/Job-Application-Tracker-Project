import React, { useEffect, useState } from 'react';
import { api } from "../../main.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { addApplicationData, allAplications } from '../../redux/slices/aplicationData.slice.js';
import { LuMapPin, LuDollarSign, LuExternalLink, LuPlus } from 'react-icons/lu';

const BOARDS = [
  { id: 'Applied', label: 'Applied', dot: 'bg-blue-500' },
  { id: 'Interview', label: 'Interview', dot: 'bg-amber-500' },
  { id: 'Offer', label: 'Offer', dot: 'bg-purple-500' },
  { id: 'Accepted', label: 'Accepted', dot: 'bg-emerald-500' },
  { id: 'Rejected', label: 'Rejected', dot: 'bg-rose-500' },
];

function KanBan() {
  const dispatch = useDispatch();
  const applicationData = useSelector(allAplications) || [];

  const [pickedCardId, setPickedCardId] = useState("");

  const handelDragStart = (id) => {
    setPickedCardId(id);
  };

  const handelDragDrop = async (boardName) => {
    try {
      const updatedApplicationList = applicationData.map((val) => 
        val._id === pickedCardId ? { ...val, status: boardName } : val 
      );
      dispatch(addApplicationData(updatedApplicationList)); 

      await api.patch(`/data/update-status/${pickedCardId}`, { status: boardName });
    } catch (error) {
      console.error("something went wrong while updating state of the job in kanban board");
    }
  };

  const handdleDropComlete = () => {
    setPickedCardId("");
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col items-center min-h-0">
      {/* Kanban Board Horizontal Track */}
      <div className="flex-1 flex gap-5 overflow-x-auto overflow-y-hidden pb-4 items-stretch select-none w-full px-4">
        {BOARDS.map((board) => {
          const columnItems = applicationData.filter(
            (app) => app.status === board.id
          );

          return (
            <div
              key={board.id}
              className="w-80 shrink-0 bg-zinc-100/70 dark:bg-zinc-950/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl flex flex-col h-full min-h-0 transition-colors"
            >
              {/* Column Header */}
              <div className="p-4 border-b border-zinc-200/60 dark:border-zinc-800/80 flex items-center justify-between shrink-0 bg-zinc-100/90 dark:bg-zinc-900/90 rounded-t-xl transition-colors">
                <div className="flex items-center gap-2.5">
                  <span className={`h-2.5 w-2.5 rounded-full ${board.dot}`} />
                  <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight">
                    {board.label}
                  </h2>
                  <span className="text-xs font-medium text-zinc-400 dark:text-zinc-400 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-full transition-colors">
                    {columnItems.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-zinc-800 rounded-md transition-colors cursor-pointer"
                  title="Add card"
                >
                  <LuPlus size={16} />
                </button>
              </div>

              {/* Column Cards Stream */}
              <div 
                className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto min-h-0"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={() => {
                  handelDragDrop(board.id);
                  handdleDropComlete();
                }}
              >
                {columnItems.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/90 rounded-xl p-4 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-md dark:shadow-black/40 transition-all cursor-grab active:cursor-grabbing group shrink-0"
                    draggable
                    onDragStart={() => {
                      handelDragStart(app._id);
                    }}
                  >
                    {/* Header: Initial & Role */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-8 w-8 rounded-md bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-sm font-semibold text-zinc-700 dark:text-zinc-200 shrink-0 transition-colors">
                          {app.companyName?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                          {app.role || 'Untitled Role'}
                        </h3>
                      </div>

                      {app.companyLink && (
                        <a
                          href={app.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 p-2 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-200 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LuExternalLink size={14} />
                        </a>
                      )}
                    </div>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium mb-4">
                      {app.companyName || 'Unknown Company'}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800/80 pt-3 mt-auto transition-colors">
                      <div className="flex items-center gap-1.5 truncate max-w-37.5">
                        <LuMapPin size={13} className="shrink-0 text-zinc-400 dark:text-zinc-500" />
                        <span className="truncate text-zinc-500 dark:text-zinc-400">{app.location || 'Remote'}</span>
                      </div>

                      {app.salaryRange ? (
                        <div className="flex items-center gap-0.5 text-zinc-600 dark:text-zinc-300 font-medium">
                          <LuDollarSign size={13} className="shrink-0 text-zinc-500 dark:text-zinc-400" />
                          <span>{app.salaryRange.replace(/^\$/, '')}</span>
                        </div>
                      ) : (
                        <span className="text-zinc-400 dark:text-zinc-500">{app.createdAt?.slice(5, 10) || '—'}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Empty State for Column */}
                {columnItems.length === 0 && (
                  <div className="h-28 border border-dashed border-zinc-200 dark:border-zinc-800/80 rounded-lg flex items-center justify-center text-xs text-zinc-400 dark:text-zinc-500 select-none shrink-0 transition-colors">
                    No applications
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default KanBan;