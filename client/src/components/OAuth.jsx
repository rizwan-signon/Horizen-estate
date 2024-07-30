import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinSuccess } from "../redux/slices/userSlice";
import app from "../firebase";
const OAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("cant signin with google", error);
    }
  };
  return (
    <div>
      <button
        onClick={handleGoogle}
        type="button"
        className="bg-blue-600 hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
      >
        sigin with Google
      </button>
    </div>
  );
};

export default OAuth;
