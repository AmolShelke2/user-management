import React, { useState } from "react";

export const UserList = ({ user, deleteUser, updateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = () => {
    // Send a request to update the user's data the usersList
    updateUser(editedUser);

    // Exit edit mode
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  return (
    <div
      key={user.id}
      className="w-full flex flex-row justify-between items-center border border-1 mb-4 p-4 rounded-lg">
      {isEditing ? (
        <div className="flex flex-row justify-between gap-2">
          {/* editing view */}
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
            className="w-[200px] p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            value={editedUser.email}
            className="w-[200px] p-3 rounded-lg"
            onChange={handleInputChange}
          />

          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            className="w-[fit] p-3 rounded-lg"
            onChange={handleInputChange}
          />

          <button
            className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm"
            onClick={handleCancelClick}>
            cancel
          </button>
          <button
            className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm"
            onClick={handleSaveClick}>
            Save
          </button>
        </div>
      ) : (
        <>
          {/* showing information view */}
          <h3 className="text-[15px] w-[100px] mr-4">{editedUser.name}</h3>
          <p className="text-[13px] w-[150px] mr-4">{editedUser.email}</p>
          <p className="text-[13px]  w-[130px] mr-4">{editedUser.phone}</p>

          <button
            className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mr-2"
            onClick={handleEditClick}>
            Edit
          </button>

          <button
            className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm"
            onClick={() => deleteUser(user.id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};
