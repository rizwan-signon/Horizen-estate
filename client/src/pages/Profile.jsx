const Profile = () => {
  return (
    <div>
      <div className=" max-w-sm sm:max-w-lg mx-auto py-10 px-4 mt-20">
        <h1 className="text-2xl sm:text-3xl text-center font-medium text-gray-500">
          Sign in
        </h1>
        <form action="#" className="flex flex-col p-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="userName..."
            id="userName"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <input
            type="text"
            placeholder="email..."
            id="email"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <input
            type="text"
            placeholder="password..."
            id="password"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <button className="bg-gray-500 hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2">
            update
          </button>
          <button className="bg-blue-500 hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2">
            create Listing
          </button>

          <div className="flex items-center justify-between space-x-3 mx-2 text-red-700 font-bold cursor-pointer">
            <span>Delete Acount</span>
            <span className=" decoration-slate-600 underline-offset-4 text-red-700 font-bold cursor-pointer">
              Signout
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
