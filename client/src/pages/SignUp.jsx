import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signupData, setSignupData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(signupData);
  console.log(error);
  const handleChange = (e) => {
    e.preventDefault();
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
      }
      setLoading(true);
      setLoading(false);
      console.log(data);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" max-w-sm sm:max-w-lg mx-auto py-10 px-4 mt-20">
      <h1 className="text-2xl sm:text-2xl text-center font-medium">Register</h1>
      <form
        action="#"
        className="flex flex-col p-2 gap-4 mt-6"
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          type="text"
          placeholder="userName..."
          id="userName"
          className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="email..."
          id="email"
          className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
        />
        <input
          onChange={handleChange}
          type="text"
          placeholder="password..."
          id="password"
          className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
        />
        <button
          disabled={loading}
          className="bg-gray-500 hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
        >
          {loading ? "loading" : "signup"}
        </button>

        <div className="flex items-center space-x-3 mx-2">
          <p>already have an account?</p>
          <span className="underline decoration-slate-600 cursor-pointer underline-offset-4 text-blue-700 font-medium">
            <Link to="/signin">Signin</Link>
          </span>
        </div>
        {error && <h1 className="text-red-700 mx-2 uppercase">{error}</h1>}
      </form>
    </div>
  );
};

export default SignUp;
