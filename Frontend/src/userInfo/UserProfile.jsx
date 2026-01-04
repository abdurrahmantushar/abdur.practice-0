import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import UserAvatarEdit from "./userAvatarEdit";
import { Axios } from '../common config/axiox';
import { SummaryApi } from '../common config/summayApi';
import { toast } from "react-toastify";
import { AxiosToastError } from '../common config/axiosToastEross';
import { setUserDetails } from "../store/userSlice";

function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [openPhotoEdit, setOpenPhotoEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);


  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    mobile: user.mobile || "",
  });

  
  useEffect(() => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
    });
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const payload = {};
      if (userData.name && userData.name !== user.name) payload.name = userData.name;
      if (userData.email && userData.email !== user.email) payload.email = userData.email.trim();
      if (userData.mobile && userData.mobile !== user.mobile) payload.mobile = userData.mobile;

      if (Object.keys(payload).length === 0) {
        toast.info("No changes to update");
        setLoading(false);
        return;
      }

      // Send update request
      const res = await Axios({
        ...SummaryApi.update_userDetails,
        
        data: payload,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUserDetails({ ...user, ...payload }));
        setEditMode(false);
      } else if (res.data.error) {
        toast.error(res.data.message);
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center gap-4 p-6">
      {/* Avatar */}
      <div className="relative group">
        <div
          className="w-40 h-40 rounded bg-gray-200 overflow-hidden shadow-xl flex items-center justify-center"
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            <FaUser className="text-gray-400 text-6xl" />
          )}
        </div>

        <div
          className="absolute inset-0 bg-black/40 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
        >
          <button
            onClick={() => setOpenPhotoEdit(true)}
            className="bg-red-600 text-white px-4 py-1 text-sm rounded-md font-semibold hover:bg-red-700"
          >
            Change
          </button>
        </div>

        {openPhotoEdit && <UserAvatarEdit close={() => setOpenPhotoEdit(false)} />}
      </div>

      <form onSubmit={handleUpdate} className="flex flex-col gap-2 w-80">
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border p-2 rounded"
          disabled={!editMode}
        />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 rounded"
          disabled={!editMode}
        />
        <input
          type="text"
          name="mobile"
          value={userData.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="border p-2 rounded"
          disabled={!editMode}
        />

        {editMode ? (
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditMode(true)}
            className="bg-red-600 text-white px-4 py-1 rounded mt-2"
          >
            Edit Profile
          </button>
        )}
      </form>
    </div>
  );
}

export default UserProfile;
