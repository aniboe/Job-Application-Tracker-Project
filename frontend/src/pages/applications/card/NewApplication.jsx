import axios from 'axios'
import { useEffect, useState } from 'react'

function NewApplication({ setAddApplication }) {


  const [statusOfApplication, setStatusOfApplication] = useState("Applied")

  const [formData, setFormData] = useState(
    {
        companyName: "",
        role: "",
        location: "",
        salaryRange: "",
        companyLink: "",
        status: "Applied"

    }
  )



  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const sendData = await axios.post("http://localhost:4000/api/v1/data/create-application",
            {  
                companyName: formData.companyName.trim(),
                role: formData.role.trim(),
                location:  formData.location.trim(),
                salaryRange: formData.salaryRange.trim(),
                companyLink: formData.companyLink.trim(),
                status: formData.status.trim()
            }, // dont wrap in {} or else data will be send as nested object (front end expects expects in single object) 
            {withCredentials: true})
        
    } catch (error) {
        console.error("Error submitting application:", error)
    }
    setAddApplication(false)
  }


  return (
    <div >
        <form className='bg-gray-300 rounded-md p-4 h-full flex flex-col ' 
            onSubmit={handleSubmit}
        >



            <div className='bg-gray-100 mb-3 rounded-md px-3 py-2'>

                <h3 className='text-2xl mb-6 text-gray-700 underline'>
                    Company Details
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
                    Job Details
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
            <div className='flex gap-7 justify-end'>
                <button className='bg-amber-700 text-white px-3 py-1 rounded-md cursor-pointer' 
                    type="button"
                    onClick={(e) => {
                        e.preventDefault()
                        setAddApplication(false)
                    }}
                >
                    cancel
                </button>
                <button className='bg-blue-600 text-white px-3 py-1 rounded-md cursor-pointer' type="submit">submit</button>
            </div>


        </form>

    </div>
  )
}

export default NewApplication