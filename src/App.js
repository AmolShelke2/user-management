import { useState, useEffect } from "react";
import { UserList } from "./components/UserList";

function App() {
  const [userLists, setUserLists] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showNewUserOverlay, setShowNewUserOverlay] = useState(false);

  const toggleShowNewUserOverlay = () => {
    setShowNewUserOverlay(!showNewUserOverlay);
  };

  /** Feteching userLists from the API and storing them in the userLists */
  useEffect(() => {
    const fetchUserLists = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();

      setTimeout(() => setUserLists(data), 1000);
    };

    fetchUserLists();
  }, []);

  /** New user onChangeHandler */
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  /** Onsubmit handler */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Define the API endpoint URL
    const apiUrl = "https://jsonplaceholder.typicode.com/users";

    // Create an object with the POST request options
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    };

    // Send the POST request
    const response = await fetch(apiUrl, requestOptions);
    const newUserP = await response.json();

    setUserLists((userlists) => [...userlists, newUserP]);

    // clear inputs after submission
    setNewUser({
      name: "",
      phone: "",
      email: "",
    });

    toggleShowNewUserOverlay(false);
  };

  // Update user function
  const editUser = (userId) => {
    console.log("updating", userId);
  };

  /** Passing this functions to the userList component for onClick callback function */
  const deleteUser = (userID) => {
    setUserLists((userlists) => userlists.filter((list) => list.id !== userID));
  };

  /** UI elements */
  return (
    <div>
      <div className="relative w-full h-full bg-gray-100 flex flex-col items-start lg:items-center">
        {/* Project title */}
        <h1 className="text-3xl font-semibold text-gray-600 p-4 mb-4">
          User Management Application
        </h1>

        <button
          className="fixed right-8 top-4 bg-blue-400 py-2 px-8
         text-white shadow-md cursor-pointer rounded-lg text-sm"
          onClick={toggleShowNewUserOverlay}>
          Add New User
        </button>

        {/* New user form inputs and submit button */}
        <div
          className={`${
            showNewUserOverlay ? "flex" : "hidden"
          } flex-col justify-start items-start bg-blue-400
          p-4 m-2 fixed top-14 right-8 shadow-md border border-1 rounded-lg`}>
          <h2 className="text-[20px] font-semibold text-white mb-2">
            Add new user
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[18px] font-semibold text-white">
                name
              </label>
              <input
                type="text"
                name="name"
                value={newUser.name}
                placeholder="Add Full Name"
                onChange={onChangeHandler}
                required
                className="w-[300px] p-3 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[18px] font-semibold text-white">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={newUser.email}
                placeholder="Add email"
                onChange={onChangeHandler}
                required
                className="w-[300px] p-3 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 mb-4">
              <label className="text-[18px] font-semibold text-white">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                value={newUser.phone}
                placeholder="Add phone number"
                onChange={onChangeHandler}
                required
                className="w-[300px] p-3 rounded-lg"
              />
            </div>
            <button
              type="submit"
              onSubmit={handleSubmit}
              className="text-blue-400 py-2 px-8 bg-white shadow-md cursor-pointer rounded-lg text-sm">
              submit
            </button>
          </form>
        </div>

        {/* Conditionaly rendering userLists component and loader */}
        {userLists ? (
          <div className="w-[900px] h-[600px] py-4 px-4 rounded-lg shadow-md border border-1 overflow-y-scroll overflow-x-scroll lg:overflow-x-hidden">
            {userLists.map((user) => {
              return (
                <UserList
                  key={user.id}
                  user={user}
                  deleteUser={deleteUser}
                  editUser={editUser}
                />
              );
            })}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
            <img
              src="/assets/loader.gif"
              alt="loading"
              height={50}
              width={50}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
