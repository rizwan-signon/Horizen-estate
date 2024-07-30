import { useSelector } from "react-redux";
import { useEffect, useRef, useState, useCallback } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";

const Profile = () => {
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [imagePerc, setImagePerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const fileRef = useRef();
  const handleFileUpload = useCallback((image) => {
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
        setError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          setFormData((prev) => ({ ...prev, profilePic: downloadUrl }));
        });
      }
    );
  }, []);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image, handleFileUpload]);

  return (
    <div>
      <div className="max-w-sm sm:max-w-lg mx-auto py-10 px-4 mt-10">
        <h1 className="text-2xl sm:text-3xl text-center font-medium text-gray-500">
          Profile
        </h1>
        <form action="#" className="flex flex-col p-2 gap-4 mt-6">
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
            <span>Delete Account</span>
            <span className="decoration-slate-600 underline-offset-4 text-red-700 font-bold cursor-pointer">
              Signout
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
