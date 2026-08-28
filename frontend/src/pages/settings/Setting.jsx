import React, { useEffect, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";

import { backendUrl } from "../../App.jsx";

import { useSelector, useDispatch } from "react-redux";
import { addUserData, userValue } from "../../redux/slices/userData.slice.js";
import { useNavigate } from "react-router-dom";

function Setting() {
  const userData = useSelector(userValue); 
  const dispatch = useDispatch();
  const changeAvatar = useRef();
  const Navigate = useNavigate()
  
  const [errors, setErrors] = useState("");
  function addError(error){
    setErrors(error);
    setTimeout(() => {
      setErrors("");
    }, 3000);
  }
  
  // 1. Popup visibility states
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Added for Delete

  // 2. Input states for modal forms
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState(""); // Added for Delete

  // Handlers to open modals
  const openUsernameModal = () => {
    setNewUsername(userData?.username || "");
    setShowUsernameModal(true);
  }

  const openEmailModal = () => {
    setNewEmail(userData?.email || "");
    setShowEmailModal(true);
  }

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(true);
  }

  const openDeleteModal = () => {
    setDeletePassword("");
    setShowDeleteModal(true);
  }

  // Submit handlers
  const handelPicChange = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      if(!e.target.files[0]){
        throw new Error("image not found");
      }
      formData.append("avatar",e.target.files[0]); 

      const newAvatar = await axios.put(`${backendUrl}/user/add-avatar`,formData ,{withCredentials: true});
      dispatch(addUserData(newAvatar?.data.data));
      setShowUsernameModal(false);
    } catch (error) {
      console.error(error);
    }
  }

  const handelPicDelete = async (e) => {
    e.preventDefault();
    try {
      const newUserData = await axios.put(`${backendUrl}/user/remove-avatar`, {}, {withCredentials:true});
      dispatch(addUserData(newUserData?.data.data));
    } catch (error) {
      console.error(error);
    }    
  }

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/user/update-username`,{newUserName: newUsername} ,{withCredentials: true});
      dispatch(addUserData(
        {
          ...userData,
          username: newUsername
        }
      ));
      setShowUsernameModal(false);
    } catch (error) {
      addError(error.response?.data.message);
    }
  }

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${backendUrl}/user/update-email`,{newUserEmail: newEmail} ,{withCredentials: true});
      dispatch(addUserData(
        {
          ...userData,
          email: newEmail
        }
      ));
      setShowEmailModal(false);
    } catch (error) {
      addError(error.response?.data.message);
    }
  }

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addError("New passwords do not match");
      return;
    }
    try {
      await axios.post(`${backendUrl}/user/update-password`,
        {
          currentPassword,
          confirmPassword
        }
        ,{withCredentials: true}
      );
      setShowPasswordModal(false);
    } catch (error) {
      addError(error.response?.data.message);
    }
  }

  // Handle Account Deletion
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      // Adjust the endpoint to match your actual backend route for deletion
      const test = await axios.post(`${backendUrl}/user/delete-account`, 
        { password: deletePassword }, 
        { withCredentials: true }
      )
      // console.log(test);
      
      
      // Clear redux state and close modal
      dispatch(addUserData(null)); 
      setShowDeleteModal(false);
      Navigate("/")
      
      // Optional: Redirect the user to the login or home page
      // window.location.href = "/login";
      
    } catch (error) {
      addError(error.response?.data.message || "Failed to delete account");
    }
  }

  return (
    <>
      <div className="h-full">
        {/* Profile Settings */}
        <h1 className="text-xl font-bold mb-2">Account Setting</h1>
        <div className="bg-blue-200 py-3 px-3 rounded-md space-y-4">
          
          {/* Profile pic update */}
          <div className="p-4 flex gap-7 border border-gray-400 rounded-md w-fit bg-white/40">
            <div className="bg-blue-400 h-52 w-52 rounded-full border border-gray-400 overflow-hidden">
              <img
                src={userData?.avatar || null}
                className="h-full w-full object-cover"
                alt="User Avatar"
              />
            </div>

            <div className="w-24 flex flex-col justify-around my-6 items-center">
              <input type="file" ref={changeAvatar} 
                hidden
                onChange={handelPicChange}
              />
              <button className="w-full bg-blue-400 px-3 py-2 rounded-md font-bold text-white hover:bg-blue-500 transition"
                onClick={() => changeAvatar.current.click() }
              >
                Change
              </button>
              <button className="w-full bg-red-500 px-3 py-2 rounded-md font-bold text-white hover:bg-red-600 transition"
                onClick={handelPicDelete}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Username Button */}
          <div>
            <button
              type="button"
              onClick={openUsernameModal}
              className="w-64 text-left border border-gray-300 px-3 py-1.5 rounded bg-white/70 hover:bg-white text-gray-800 transition"
            >
              {userData?.username || "Set Username"}
            </button>
          </div>

          {/* Email Button */}
          <div>
            <button
              type="button"
              onClick={openEmailModal}
              className="w-64 text-left border border-gray-300 px-3 py-1.5 rounded bg-white/70 hover:bg-white text-gray-800 transition"
            >
              {userData?.email || "Set Email"}
            </button>
          </div>

          {/* Password Button */}
          <div>
            <button
              type="button"
              onClick={openPasswordModal}
              className="w-64 text-left border border-gray-300 px-3 py-1.5 rounded bg-white/70 hover:bg-white text-gray-800 tracking-widest transition"
            >
              Edit Password
            </button>
          </div>
        </div>

        {/* Delete Account */}
        <h1 className="text-xl font-bold mt-6 mb-2">Delete Account</h1>
        <div className="bg-red-200 py-3 px-3 rounded-md">
          <button 
            onClick={openDeleteModal}
            className="bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* ----------------- Popups / Modals ----------------- */}

      {/* Username Change Popup */}
      {showUsernameModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
            <button
              onClick={() => setShowUsernameModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Change Username</h2>
            <form onSubmit={handleUpdateUsername} className="flex flex-col gap-3">
              <h1 className="text-red-500 text-sm">{errors}</h1>
              <input
                type="text"
                className="border p-2 rounded outline-none focus:border-blue-500"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="Enter new username"
                autoFocus
              />
              
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowUsernameModal(false)}
                  className="px-3 py-1.5 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Change Popup */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative">
            <button
              onClick={() => setShowEmailModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Change Email</h2>
            <form onSubmit={handleUpdateEmail} className="flex flex-col gap-3">
              <h1 className="text-red-500 text-sm">{errors}</h1>
              <input
                type="email"
                className="border p-2 rounded outline-none focus:border-blue-500"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="Enter new email"
                autoFocus
              />
              
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-3 py-1.5 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Change Popup */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-84 shadow-lg relative">
            <button
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-4">Change Password</h2>
            <form onSubmit={handleUpdatePassword} className="flex flex-col gap-3">
              <h1 className="text-red-500 text-sm">{errors}</h1>
              <input
                type="password"
                className="border p-2 rounded outline-none focus:border-blue-500 text-sm"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                required
                autoFocus
              />
              <input
                type="password"
                className="border p-2 rounded outline-none focus:border-blue-500 text-sm"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                required
              />
              <input
                type="password"
                className="border p-2 rounded outline-none focus:border-blue-500 text-sm"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Popup */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 shadow-lg relative border-t-4 border-red-600">
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              <MdClose size={20} />
            </button>
            <h2 className="text-lg font-bold mb-2 text-red-600">Delete Account</h2>
            <p className="text-sm text-gray-600 mb-4">
              This action cannot be undone. Please enter your password to confirm.
            </p>
            <form onSubmit={handleDeleteAccount} className="flex flex-col gap-3">
              <h1 className="text-red-500 text-sm">{errors}</h1>
              <input
                type="password"
                className="border p-2 rounded outline-none focus:border-red-500 text-sm"
                value={deletePassword}
                onChange={(e) => setDeletePassword(e.target.value)}
                placeholder="Enter your password"
                required
                autoFocus
              />
              
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="px-3 py-1.5 border rounded text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-red-600 text-white rounded font-semibold hover:bg-red-700"
                >
                  Confirm Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  );
}

export default Setting;