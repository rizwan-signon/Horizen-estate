import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <header className=" bg-gray-400 p-2 shadow-md">
      <nav className=" flex items-center justify-between max-w-sm sm:max-w-6xl mx-auto">
        <h1 className="text-sm font-medium sm:text-2xl flex flex-col sm:flex-row">
          <span>Horizen</span>
          <span className="text-gray-600">Estate</span>
        </h1>
        <form
          action="#"
          className=" flex items-center p-2 bg-slate-100 rounded-lg"
        >
          <input
            type="text"
            placeholder="search..."
            className=" bg-transparent py-0 sm:py-2 text-xl rounded-xl px-4 focus:outline-none w-24 sm:w-full"
          />
          <FaSearch className="text-xl text-gray-500 cursor-pointer" />
        </form>
        <ul className="flex items-center space-x-4">
          <li className=" hidden text-xl sm:inline hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-xl hidden sm:inline hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className="text-xl hidden sm:inline hover:underline">
            <Link to="/signup">
              <button className=" bg-blue-700 px-4 py-2 rounded-lg text-white">
                Register
              </button>
            </Link>
          </li>
          <li className=" text-2xl sm:text-xl sm:inline hover:underline">
            <Link to="/profile">
              {currentUser ? (
                <h2 className=" uppercase font-medium text-2xl">
                  {currentUser.userName}
                </h2>
              ) : (
                <button className=" bg-green-700  px-3 py-2 rounded-lg text-white uppercase font-medium">
                  Login
                </button>
              )}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
