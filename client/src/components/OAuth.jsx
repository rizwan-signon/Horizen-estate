import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { signinSuccess } from "../redux/slices/userSlice";
import app from "../firebase";
const OAuth = () => {
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
          Content_Type: "application/json",
        },
        body: JSON.stringify({
          userName: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await response.json();
      dispatch(signinSuccess(data));
    } catch (error) {
      console.log("cant signin with google");
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
