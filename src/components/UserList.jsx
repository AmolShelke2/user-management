import React from "react";

export const UserList = ({ user, deleteUser, editUser }) => {
  return (
    <div
      key={user.id}
      className="w-full flex flex-row justify-between items-center border border-1 mb-4 p-4 rounded-lg">
      <h3 className="text-[15px] w-[100px] mr-4">{user.name}</h3>
      <p className="text-[13px] w-[150px] mr-4">{user.email}</p>
      <p className="text-[13px]  w-[130px] mr-4">{user.phone.split("x")}</p>

      <button
        className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm mr-2"
        onClick={() => editUser(user.id)}>
        Edit
      </button>

      <button
        className=" bg-blue-400 py-2 px-8 text-white shadow-md cursor-pointer rounded-lg text-sm"
        onClick={() => deleteUser(user.id)}>
        Delete
      </button>
    </div>
  );
};
