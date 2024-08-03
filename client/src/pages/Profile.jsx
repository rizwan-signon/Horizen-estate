import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { signinSuccess, deleteUser, signOut } from "../redux/slices/userSlice";
import { useNavigate, Link } from "react-router-dom";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [imagePerc, setImagePerc] = useState(0);
  const [showListing, setShowListings] = useState([]);
  const { currentUser, error } = useSelector((state) => state.user);
  const [updated, setUpdated] = useState(false);
  const fileRef = useRef();
  console.log(showListing);
  const handleFileUpload = (image) => {
    const storage = getStorage(app);
    const imageName = new Date().getTime() + image.name;
    const storageRef = ref(storage, imageName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData((prev) => ({ ...prev, profilePic: downloadUrl }));
        });
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      dispatch(signinSuccess(data));
      setUpdated(true);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  //get listings data
  const handleListings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      setShowListings(data);
    } catch (error) {
      console.log(error);
    }
  };
  //delete user
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      dispatch(deleteUser(data));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  //signout
  const handleSignOut = async () => {
    try {
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      dispatch(signOut(data));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  return (
    <div>
      <div className="max-w-sm sm:max-w-lg mx-auto py-10 px-4 mt-4">
        <h1 className="text-2xl sm:text-3xl text-center font-medium text-gray-500">
          Profile
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="flex flex-col p-2 gap-4 mt-6"
        >
          <input
            onChange={(e) => setImage(e.target.files[0])}
            ref={fileRef}
            type="file"
            className="hidden"
            accept="image/*"
          />
          <img
            onClick={() => fileRef.current.click()}
            src={formData.profilePic || currentUser.profilePic}
            alt="profile pic"
            className="h-24 w-24 rounded-full object-cover self-center cursor-pointer"
          />
          <p className="text-center font-medium">
            {error ? (
              <p className="text-red-700">
                Error while uplouding image or format is incorrect
              </p>
            ) : imagePerc > 0 && imagePerc < 100 ? (
              <p>{`file is ${imagePerc} % uplouded`}</p>
            ) : imagePerc === 100 ? (
              <p className="text-green-600">successfully uplouded</p>
            ) : (
              ""
            )}
          </p>
          <input
            onChange={handleChange}
            type="text"
            defaultValue={currentUser.userName}
            placeholder="userName..."
            id="userName"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <input
            onChange={handleChange}
            type="text"
            defaultValue={currentUser.email}
            placeholder="email..."
            id="email"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <input
            onChange={handleChange}
            type="password"
            placeholder="password..."
            id="password"
            className="bg-gray-400 w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          />
          <button
            type="submit"
            className="bg-gray-500 hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
          >
            update
          </button>
          <div className="flex items-center gap-3">
            <Link
              to="/create_listing"
              className="bg-blue-500 text-center hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
            >
              create Listing
            </Link>
            <Link
              onClick={handleListings}
              to="/create_listing"
              className=" text-gray-200 bg-blue-500 text-center hover:opacity-90 uppercase font-medium w-full focus:overflow-hidden rounded-lg placeholder:text-gray-500 py-3 px-2"
            >
              show Listing
            </Link>
          </div>
          <div className="flex items-center justify-between space-x-3 mx-2 text-red-700 font-bold cursor-pointer">
            <span onClick={handleDeleteUser}>Delete Account</span>
            <span
              onClick={handleSignOut}
              className="decoration-slate-600 underline-offset-4 text-red-700 font-bold cursor-pointer"
            >
              Signout
            </span>
          </div>
          {updated && (
            <p className=" text-green-700 font-bold">
              you update your profile successfully
            </p>
          )}
        </form>
        <div className="">
          {showListing.length > 0 &&
            showListing.map((listing) => (
              <div
                key={listing._id}
                className="border rounded-lg p-2 my-2 flex items-center justify-between"
              >
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="images"
                    className="h-16 w-16 object-contain rounded-lg"
                  />
                </Link>
                <Link to={`/listing/${listing._id}`}>
                  <h1 className="text-xl font-medium hover:underline truncate">
                    {listing.name}
                  </h1>
                </Link>
                <div className="flex flex-col gap-4">
                  <button className=" uppercase font-medium bg-red-700 px-3 py-1 rounded-lg">
                    delete
                  </button>
                  <button className=" uppercase font-medium bg-gray-500 px-3 py-1 rounded-lg">
                    edit
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
