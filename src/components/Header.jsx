import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className=" bg-gray-400 p-3 shadow-md">
      <nav className=" flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-sm font-medium sm:text-3xl flex flex-col sm:flex-row">
          <span>Horizen</span>
          <span className="text-gray-600">Estate</span>
        </h1>
        <form
          action="#"
          className=" flex items-center p-3 bg-slate-100 rounded-lg"
        >
          <input
            type="text"
            placeholder="search..."
            className=" bg-transparent py-0 sm:py-2 text-xl rounded-xl px-4 focus:outline-none w-24 sm:w-full"
          />
          <FaSearch className="text-xl text-gray-500" />
        </form>
        <ul className="flex items-center space-x-4">
          <li className=" hidden text-xl sm:inline hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="text-xl hidden sm:inline hover:underline">
            <Link to="/about">About</Link>
          </li>
          <li className=" text-sm sm:text-xl sm:inline hover:underline">
            <Link to="/signin">signin</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
