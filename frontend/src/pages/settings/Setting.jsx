import React, { useRef, useState } from "react";
import { api } from "../../main.jsx";
import { LuX, LuUpload, LuTrash2, LuLock, LuUser, LuMail } from "react-icons/lu";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { useSelector, useDispatch } from "react-redux";
import { addUserData, userValue } from "../../redux/slices/userData.slice.js";
import { useNavigate } from "react-router-dom";

function Setting() {
  const userData = useSelector(userValue);
  const dispatch = useDispatch();
  const changeAvatar = useRef();
  const navigate = useNavigate();

  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);

  const addError = (error) => {
    setErrors(error);
    setTimeout(() => {
      setErrors("");
    }, 3500);
  };

  // Modal visibility states
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Form input states
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");

  const openUsernameModal = () => {
    setNewUsername(userData?.username || "");
    setShowUsernameModal(true);
  };

  const openEmailModal = () => {
    setNewEmail(userData?.email || "");
    setShowEmailModal(true);
  };

  const openPasswordModal = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(true);
  };

  const openDeleteModal = () => {
    setDeletePassword("");
    setShowDeleteModal(true);
  };

  const handelPicChange = async (e) => {
    try {
      e.preventDefault();
      if (!e.target.files?.[0]) return;
      
      setLoading(true);
      const formData = new FormData();
      formData.append("avatar", e.target.files[0]);

      const res = await api.put(`/user/add-avatar`, formData);
      dispatch(addUserData(res?.data?.data));
    } catch (error) {
      console.error(error);
      addError(error.response?.data?.message || "Failed to upload avatar");
    } finally {
      setLoading(false);
    }
  };

  const handelPicDelete = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.put(`/user/remove-avatar`, {});
      dispatch(addUserData(res?.data?.data));
    } catch (error) {
      console.error(error);
      addError(error.response?.data?.message || "Failed to remove avatar");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/user/update-username`, { newUserName: newUsername.trim() });
      dispatch(addUserData({ ...userData, username: newUsername.trim() }));
      setShowUsernameModal(false);
    } catch (error) {
      addError(error.response?.data?.message || "Failed to update username");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/user/update-email`, { newUserEmail: newEmail.trim()});
      dispatch(addUserData({ ...userData, email: newEmail.trim() }));
      setShowEmailModal(false);
    } catch (error) {
      addError(error.response?.data?.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addError("New passwords do not match");
      return;
    }
    try {
      setLoading(true);
      await api.post(`/user/update-password`,
        { currentPassword, confirmPassword },
      );
      setShowPasswordModal(false);
    } catch (error) {
      addError(error.response?.data?.message || "Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post(`/user/delete-account`, { password: deletePassword });
      dispatch(addUserData(null));
      setShowDeleteModal(false);
      navigate("/");
    } catch (error) {
      addError(error.response?.data?.message || "Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6 pb-8">
      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-2xs p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Profile Picture</h2>
        <p className="text-xs text-zinc-400 mt-0.5">Manage your public avatar</p>

        <div className="mt-5 flex items-center gap-5">
          <div className="h-16 w-16 rounded-full border border-zinc-200 bg-zinc-100 overflow-hidden flex items-center justify-center text-zinc-600 font-semibold text-xl shrink-0">
            {userData?.avatar ? (
              <img src={userData.avatar} className="h-full w-full object-cover" alt="User Avatar" />
            ) : (
              <span>{userData?.username?.charAt(0).toUpperCase() || "U"}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input type="file" ref={changeAvatar} hidden onChange={handelPicChange} accept="image/*" />
            <button
              type="button"
              disabled={loading}
              onClick={() => changeAvatar.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
            >
              <LuUpload size={13} />
              <span>Upload photo</span>
            </button>

            {userData?.avatar && (
              <button
                type="button"
                disabled={loading}
                onClick={handelPicDelete}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200/70 text-zinc-700 rounded-lg text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
              >
                <LuTrash2 size={13} />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Account Details Section */}
      <div className="bg-white rounded-xl border border-zinc-200 shadow-2xs divide-y divide-zinc-100">
        <div className="p-6">
          <h2 className="text-sm font-semibold text-zinc-900">Account Information</h2>
          <p className="text-xs text-zinc-400 mt-0.5">Your personal authentication credentials</p>
        </div>

        {/* Username Row */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0">
              <LuUser size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">Username</p>
              <p className="text-sm font-medium text-zinc-800 truncate">{userData?.username || "Not set"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openUsernameModal}
            className="px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Change
          </button>
        </div>

        {/* Email Row */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0">
              <LuMail size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">Email address</p>
              <p className="text-sm font-medium text-zinc-800 truncate">{userData?.email || "Not set"}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openEmailModal}
            className="px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Change
          </button>
        </div>

        {/* Password Row */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-8 w-8 rounded-lg bg-zinc-100 text-zinc-500 flex items-center justify-center shrink-0">
              <LuLock size={15} />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-zinc-400">Password</p>
              <p className="text-sm font-medium text-zinc-800">••••••••••••</p>
            </div>
          </div>
          <button
            type="button"
            onClick={openPasswordModal}
            className="px-3 py-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Update
          </button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-rose-200/70 shadow-2xs p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-semibold text-rose-950">Danger Zone</h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Permanently delete your account and all associated applications
            </p>
          </div>
          <button
            type="button"
            onClick={openDeleteModal}
            className="px-3.5 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shrink-0 shadow-2xs"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* ---------------- Modals ---------------- */}

      {/* Username Modal */}
      {showUsernameModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowUsernameModal(false)}
        >
          <div
            className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Change Username</h3>
              <button
                type="button"
                onClick={() => setShowUsernameModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <LuX size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateUsername} className="p-5 flex flex-col gap-3.5">
              {errors && <p className="text-xs text-rose-600">{errors}</p>}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">New username</label>
                <input
                  type="text"
                  required
                  autoFocus
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
                  placeholder="Enter new username"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowUsernameModal(false)}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowEmailModal(false)}
        >
          <div
            className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Change Email Address</h3>
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <LuX size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdateEmail} className="p-5 flex flex-col gap-3.5">
              {errors && <p className="text-xs text-rose-600">{errors}</p>}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">New email address</label>
                <input
                  type="email"
                  required
                  autoFocus
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
                  placeholder="name@example.com"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowPasswordModal(false)}
        >
          <div
            className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-zinc-900">Change Password</h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-700 rounded-lg"
              >
                <LuX size={16} />
              </button>
            </div>

            <form onSubmit={handleUpdatePassword} className="p-5 flex flex-col gap-3.5">
              {errors && <p className="text-xs text-rose-600">{errors}</p>}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">Current password</label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">New password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">Confirm new password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-3.5 py-1.5 text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Updating..." : "Update password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-xl border border-zinc-200 shadow-xl overflow-hidden w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-10 w-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                <TbAlertTriangleFilled  size={20} />
              </div>
              <h3 className="text-base font-semibold text-zinc-900">Delete Account</h3>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                This will permanently delete your account, saved applications, and activity history.
              </p>
            </div>

            <form onSubmit={handleDeleteAccount} className="mt-5 flex flex-col gap-3.5">
              {errors && <p className="text-xs text-rose-600 text-center">{errors}</p>}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-zinc-700">Enter password to confirm</label>
                <input
                  type="password"
                  required
                  autoFocus
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="h-9 px-3 rounded-lg border border-zinc-200 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:border-rose-400 transition-colors shadow-2xs"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-3 py-2 text-xs font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200/70 rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-3 py-2 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer shadow-2xs disabled:opacity-50"
                >
                  {loading ? "Deleting..." : "Confirm Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Setting;