import React, { useEffect, useState } from 'react';
import {api} from "../../main.jsx"
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
  // console.log(applicationData);
  

  const [pickedCardId, setPickedCardId] = useState("")

  const handelDragStart = (id) => {
    setPickedCardId(id)
  }

  const handelDragDrop = async (boardName) => {
    try {
      const updatedApplicationList = applicationData.map((val) => val._id === pickedCardId ? {...val, status:boardName}: val )
      dispatch(addApplicationData(updatedApplicationList)) 

      await api.patch(`/data/update-status/${pickedCardId}`,{status: boardName} )
    } catch (error) {
      console.error("something went wrong while updating state of the job in kanban board")
    }
  }

  const handdleDropComlete = () => {
    setPickedCardId("")
  }

 

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col items-center min-h-0">
      {/* Kanban Board Horizontal Track */}
      <div className="flex-1 flex gap-4 overflow-x-auto overflow-y-hidden pb-2 items-stretch select-none">
        {BOARDS.map((board) => {
          const columnItems = applicationData.filter(
            (app) => app.status === board.id
          );

          return (
            <div
              key={board.id}
              className="w-72 shrink-0 bg-zinc-100/70 border border-zinc-200/80 rounded-xl flex flex-col h-[90%] min-h-0"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-zinc-200/60 flex items-center justify-between shrink-0 bg-zinc-100/90 rounded-t-xl">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${board.dot}`} />
                  <h2 className="text-xs font-semibold text-zinc-900 tracking-tight">
                    {board.label}
                  </h2>
                  <span className="text-[11px] font-medium text-zinc-400 bg-white border border-zinc-200 px-1.5 py-0.2 rounded-full">
                    {columnItems.length}
                  </span>
                </div>

                <button
                  type="button"
                  className="p-1 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 rounded-md transition-colors cursor-pointer"
                  title="Add card"
                >
                  <LuPlus size={14} />
                </button>
              </div>

              {/* Column Cards Stream (Independent vertical scrolling) */}
              <div className="p-2.5 flex-1 flex flex-col gap-2.5 overflow-y-auto min-h-0"
                // drag and drop logic here
                onDragOver={(e) => {
                    e.preventDefault()
                    // console.log("we on top of : ",board.id)
                }}
                onDrop={() => {
                  handelDragDrop(board.id)
                  handdleDropComlete
                }}
              >
                {columnItems.map((app) => (
                  <div
                    key={app._id}
                    className="bg-white border border-zinc-200/80 rounded-lg p-3.5 shadow-2xs hover:border-zinc-300 hover:shadow-xs transition-all cursor-grab active:cursor-grabbing group shrink-0"

                    // drag and drop logic here
                    draggable
                    onDragStart={() => {
                      handelDragStart(app._id)
                      // console.log("here is how element data looks like: ",app._id)
                    }}

                  >
                    {/* Header: Initial & Role */}
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-6 w-6 rounded-md bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-semibold text-zinc-700 shrink-0">
                          {app.companyName?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <h3 className="text-xs font-semibold text-zinc-900 truncate">
                          {app.role || 'Untitled Role'}
                        </h3>
                      </div>

                      {app.companyLink && (
                        <a
                          href={app.companyLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <LuExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <p className="text-xs text-zinc-500 font-medium mb-3">
                      {app.companyName || 'Unknown Company'}
                    </p>

                    {/* Metadata Footer */}
                    <div className="flex items-center justify-between text-[11px] text-zinc-400 border-t border-zinc-100 pt-2.5 mt-auto">
                      <div className="flex items-center gap-1 truncate max-w-30">
                        <LuMapPin size={11} className="shrink-0" />
                        <span className="truncate">{app.location || 'Remote'}</span>
                      </div>

                      {app.salaryRange ? (
                        <div className="flex items-center gap-0.5 text-zinc-600 font-medium">
                          <LuDollarSign size={11} className="shrink-0" />
                          <span>{app.salaryRange.replace(/^\$/, '')}</span>
                        </div>
                      ) : (
                        <span>{app.createdAt?.slice(5, 10) || '—'}</span>
                      )}
                    </div>
                  </div>
                ))}

                {/* Empty State for Column */}
                {columnItems.length === 0 && (
                  <div className="h-24 border border-dashed border-zinc-200 rounded-lg flex items-center justify-center text-[11px] text-zinc-400 select-none shrink-0">
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