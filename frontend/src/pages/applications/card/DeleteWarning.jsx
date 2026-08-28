import React, { useEffect } from 'react'
import axios from 'axios'
import { backendUrl } from '../../../App.jsx'
import { useSelector, useDispatch } from "react-redux"
import { allAplications, addApplicationData } from '../../../redux/slices/aplicationData.slice.js'




function DeleteWarning({ selectedApplication, setShowDeleteWarning, setSetshowApplication }) {
    const dispatch = useDispatch()
    const reduxApplicaionData = useSelector(allAplications)

    const handleConfirmDelete = async () => {
        try {
            // Trigger the actual API call to delete the saved ID [cite: 37]
            await axios.delete(`${backendUrl}/data/delete-application/${selectedApplication._id}`, {withCredentials: true});
            
            if(setShowDeleteWarning) setSetshowApplication(false)
            
            setShowDeleteWarning(false)
            const updatedStateAfterDeletion = reduxApplicaionData.filter((val) => val._id !== selectedApplication._id && val)

            dispatch(addApplicationData(updatedStateAfterDeletion))


        } catch (error) {
            console.error("Failed to delete:", error)
        }
    };

    return (
        <div 
            className='fixed inset-0 flex flex-col items-center justify-center bg-black/55 z-50'
            onClick={() => {
                // If Cancel (clicking background): Reset the state, hide the modal [cite: 36]
                setShowDeleteWarning(false);
            }}
        >
            <div 
                className="bg-gray-100 p-6 rounded-md shadow-lg max-w-sm w-full text-center"
                onClick={(e) => e.stopPropagation()} // Prevent background click from closing
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Delete Application?</h2>
                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete your application for <span className="font-semibold">{selectedApplication?.companyName}</span>? This action cannot be undone.
                </p>
                
                <div className="flex justify-center gap-4">
                    <button 
                        type="button"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md font-semibold cursor-pointer"
                        onClick={() => {
                            // If Cancel: Reset the state, hide the modal [cite: 36]
                            setShowDeleteWarning(false);
                        }}
                    >
                        Cancel
                    </button>
                    
                    <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-semibold cursor-pointer"
                        type="button"
                        onClick={handleConfirmDelete}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarning