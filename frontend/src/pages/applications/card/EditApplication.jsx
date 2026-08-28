import React, { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../../../App.jsx'

import { useSelector, useDispatch } from 'react-redux'
import { allAplications, addApplicationData } from '../../../redux/slices/aplicationData.slice.js'

function EditApplication({ selectedApplication, setEditApplication, setSetshowApplication, showApplication, setSelectedApplication }) {

    const dispatch = useDispatch()
    const reduxApplicationData = useSelector(allAplications)

    

  // Initialize state with the existing application data
  const [statusOfApplication, setStatusOfApplication] = useState(selectedApplication?.status || "Applied")
  
  const [formData, setFormData] = useState({
      companyName: selectedApplication?.companyName || "",
      role: selectedApplication?.role || "",
      location: selectedApplication?.location || "",
      salaryRange: selectedApplication?.salaryRange || "",
      companyLink: selectedApplication?.companyLink || "",
      status: selectedApplication?.status || "Applied"
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const data = {  
            companyName: formData.companyName.trim(),
            role: formData.role.trim(),
            location:  formData.location.trim(),
            salaryRange: formData.salaryRange.trim(),
            companyLink: formData.companyLink.trim(),
            status: formData.status.trim()
        }
        // Assuming your update route requires the application ID
        const sendData = await axios.patch(`${backendUrl}/data/update-application/${selectedApplication._id}`,
            data, 
            {withCredentials: true}
        )
        
        // Close edit modal on success
        setEditApplication(false)
        
        // Optional: you might want to refresh your application list here
        const updatedApplicationAfterEditedApplication = reduxApplicationData.map((val) => {
            if(val._id === selectedApplication._id) {
                const updatedObj ={
                    ...val,
                    ...data
                }
                setSelectedApplication(updatedObj)
                return updatedObj

            }return val
        })
        // console.log(updatedApplicationAfterEditedApplication);
        
        dispatch(addApplicationData(updatedApplicationAfterEditedApplication))
        
        
    } catch (error) {
        console.error("Error updating application:", error)
    }
  }

  return (
    <div onClick={(e) => e.stopPropagation()}>
        <form className='bg-gray-300 rounded-md p-4 h-full flex flex-col' 
            onKeyDown={(e) => {
                if (e.key === "Enter"){
                    e.preventDefault()
                    return
                }
            }}
            onSubmit={handleSubmit}
        >

            <div className='bg-gray-100 mb-3 rounded-md px-3 py-2'>

                <h3 className='text-2xl mb-6 text-gray-700 underline'>
                    Edit Company Details
                </h3>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                    <label className='col-span-1 text-xl text-gray-600' htmlFor="">company name</label>
                    <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                        required
                    />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                    <label className='col-span-1 text-xl text-gray-600' htmlFor="">Link</label>
                    <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  
                        type="text"
                        value={formData.companyLink}
                        onChange={(e) => setFormData({...formData, companyLink: e.target.value})}
                        required
                    />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                    <label className='col-span-1 text-xl text-gray-600' htmlFor="">Location</label>
                    <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        required
                    />
                </div>

            </div>


            <div className='bg-gray-100 mb-3 rounded-md px-3 py-2'>

                <h3 className='text-2xl mb-6 text-gray-700 underline'>
                    Edit Job Details
                </h3>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                    <label className='col-span-1 text-xl text-gray-600' htmlFor="">Role</label>
                    <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        required
                    />
                </div>

                <div className='grid grid-cols-3 mb-4 gap-8'>
                    <label className='col-span-1 text-xl text-gray-600' htmlFor="">Salary Range</label>
                    <input  className='bg-white text-gray-600 col-span-2 rounded-md border-0 outline-0 h-10 w-80 text-xl pl-2 pb-0.5'  
                        type="text"
                        value={formData.salaryRange}
                        onChange={(e) => setFormData({...formData, salaryRange: e.target.value})}
                        required
                    />
                </div>

            </div>
            

            <div className='bg-gray-100 mb-3 rounded-md px-3 py-2 flex flex-col'>

                <label className='text-xl text-gray-600' htmlFor="">Status</label>

                <div className='flex justify-between gap-5 my-2'>
                    <button 
                        className={`${statusOfApplication === "Applied" ? "bg-[#3B82F6]" : "bg-gray-300"} cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white`} 
                        type="button"
                        onClick={() => {
                            setStatusOfApplication("Applied")
                            setFormData({...formData, status: "Applied"})
                        }}
                    >
                    Applied
                    </button>

                    <button 
                        className={`${statusOfApplication === "Interview" ? "bg-[#F59E0B]" : "bg-gray-300"} cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white`} 
                        type="button"
                        onClick={() => {
                            setStatusOfApplication("Interview")
                            setFormData({...formData, status: "Interview"})
                        }}
                    >
                    Interview
                    </button>

                    <button 
                        className={`${statusOfApplication === "Offer" ? "bg-[#8B5CF6]" : "bg-gray-300"} cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white`} 
                        type="button"
                        onClick={() => {
                            setStatusOfApplication("Offer")
                            setFormData({...formData, status: "Offer"})
                        }}
                    >
                    Offer
                    </button>

                    <button 
                        className={`${statusOfApplication === "Accepted" ? "bg-[#22C55E]" : "bg-gray-300"} cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white`} 
                        type="button"
                        onClick={() => {
                            setStatusOfApplication("Accepted")
                            setFormData({...formData, status: "Accepted"})
                        }}
                    >
                    Accepted
                    </button>

                    <button 
                        className={`${statusOfApplication === "Rejected" ? "bg-[#EF4444]" : "bg-gray-300"} cursor-pointer px-3 py-2 rounded-md text-[16px] font-semibold text-white`} 
                        type="button"
                        onClick={() => {
                            setStatusOfApplication("Rejected")
                            setFormData({...formData, status: "Rejected"})
                        }}
                    >
                    Rejected
                    </button>

                </div>
            </div>
            
            {/* submit or cancel */}
            <div className='flex gap-7 justify-end mt-2'>
                <button className='bg-amber-700 text-white px-3 py-1 rounded-md cursor-pointer' 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        setEditApplication(false)
                        // Optionally go back to the details popup when cancelling:
                        if(showApplication) setSetshowApplication(true)
                    }}
                >
                    Cancel
                </button>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer' type="submit">
                    Save Changes
                </button>
            </div>

        </form>

    </div>
  )
}

export default EditApplication