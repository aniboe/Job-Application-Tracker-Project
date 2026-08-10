import React from 'react'

function ApplicationPopup({ selectedApplication, setEditApplication, setSetshowApplication, setShowDeleteWarning }) {
  return (

    <>
        <div className="bg-gray-300 rounded-md p-4 flex flex-col gap-3 w-100"
            onClick={(e) => e.stopPropagation()}
        >
    
            {/* Top Section: Header & Edit */}
            <div className="bg-gray-100 flex items-start justify-between p-4 rounded-md">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-700">
                        {selectedApplication?.role}
                    </h2>
                    <p className="text-gray-500 mt-1 text-sm">
                        {selectedApplication?.createdAt.slice(0, 10)}
                    </p>
                </div>

                <div className='flex flex-col gap-1'>
                    <button
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium"
                        onClick={() => {
                            setSetshowApplication(false)
                            setEditApplication(true)
                        }}
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="bg-red-500 hover:bg-gray-400 text-gray-700 px-3 py-1.5 rounded-md cursor-pointer text-sm font-medium"
                        onClick={() => {
                            setShowDeleteWarning(true)
                        }}
                    >
                        Delete
                    </button>
                </div>

            </div>

            {/* Mid Section: Details Grid */}
            <div className="bg-gray-100 p-4 rounded-md space-y-3">

                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2">
                    <span className="col-span-1 text-gray-500 pr-3">Name</span>
                    <span className="col-span-1 text-gray-700 font-medium">
                        {selectedApplication?.companyName}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2">
                    <span className="col-span-1 text-gray-500 pr-3">Location</span>
                    <span className="col-span-1 text-gray-700 font-medium">
                        {selectedApplication?.location}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2">
                    <span className="col-span-1 text-gray-500 pr-3">Company Link</span>
                    <a
                        href={selectedApplication?.companyLink}
                        rel="noopener noreferrer"
                        className="col-span-1 text-blue-600 hover:underline truncate"
                    >
                        {selectedApplication?.companyLink}
                    </a>
                </div>

                <div className="grid grid-cols-2 gap-2 border-b border-gray-200 pb-2">
                    <span className="col-span-1 text-gray-500 pr-3">Salary</span>
                    <span className="col-span-1 text-gray-700 font-medium">
                        {selectedApplication?.salaryRange}
                    </span>
                </div>

            </div>

            {/* Bottom Section: Status */}
            <div className="bg-gray-100 p-4 rounded-md flex justify-between items-center">
                <span className="text-gray-500">Status</span>
                <span
                    className={`
                        px-3 py-1 rounded-md text-sm font-semibold text-white
                        ${
                            selectedApplication?.status === "Applied"
                            ? "bg-[#3B82F6]"
                            : selectedApplication?.status === "Interview"
                            ? "bg-[#F59E0B]"
                            : selectedApplication?.status === "Offer"
                            ? "bg-[#8B5CF6]"
                            : selectedApplication?.status === "Accepted"
                            ? "bg-[#22C55E]"
                            : selectedApplication?.status === "Rejected"
                            ? "bg-[#EF4444]"
                            : "bg-gray-500"
                        }
                    `}
                >
                    {selectedApplication?.status}
                </span>
            </div>

        </div>
    </>
    
  )
}

export default ApplicationPopup