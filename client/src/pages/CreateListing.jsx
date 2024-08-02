import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import app from "../firebase";
import { useNavigate } from "react-router-dom";

const CreateListing = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(currentUser);
  const [files, setFiles] = useState([]);
  console.log(files);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountPrice: 2,
    bedRooms: 1,
    bathRooms: 1,
    furnished: false,
    parking: false,
    type: "rent",
    offer: false,
  });
  const handleChange = (e) => {
    if (e.target.id === "sale" || e.target.value === "rent") {
      setFormData({ ...formData, type: e.target.id });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.checked });
    }
    if (
      e.target.type === "text" ||
      e.target.type === "textarea" ||
      e.target.type === "number"
    ) {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };
  const handleRemove = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((url, i) => i !== index),
    });
  };
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length < 7) {
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData,
          imageUrls: formData.imageUrls.concat(urls),
        });
      });
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            console.log(downloadUrl);
            resolve(downloadUrl);
          });
        }
      );
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 0)
        return setError("you must upload at least one image ");
      setLoading(true);
      const res = await fetch("/api/listing/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, userRef: currentUser._id }),
      });
      const data = await res.json();
      setLoading(false);
      navigate(`/listing/${data._id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <main className=" max-w-5xl mx-auto mt-4 py-2">
      <h1 className="font-medium text-2xl sm:text-4xl text-center my-7 text-gray-500">
        Create Listing
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-4 px-4"
      >
        <div className="w-full sm:w-1/2">
          <input
            onChange={handleChange}
            value={formData.name}
            type="text"
            placeholder="name.."
            id="name"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <textarea
            onChange={handleChange}
            type="text"
            placeholder="description.."
            id="description"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <input
            onChange={handleChange}
            type="text"
            placeholder="address.."
            id="address"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <div className="flex gap-6 flex-wrap mt-10">
            <div className=" flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="sale"
                checked={formData.type === "sale"}
                className="w-6"
              />
              <span>sell</span>
            </div>
            <div className="flex  gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="rent"
                checked={formData.type === "rent"}
                className="w-6"
              />
              <span>rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                type="checkbox"
                id="parking"
                checked={formData.parking}
                className="w-6"
              />
              <span>parking lot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.furnished}
                type="checkbox"
                id="furnished"
                className="w-6"
              />
              <span>fernished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={handleChange}
                checked={formData.offer}
                type="checkbox"
                id="offer"
                className="w-6"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className=" flex flex-wrap mt-10 gap-6">
            <div className="flex items-center gap-2">
              <input
                onChange={handleChange}
                type="number"
                min={0}
                max={10}
                id="bedRooms"
                value={formData.bedRooms}
                className="h-10 w-20 rounded p-3 border border-gray-600"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={handleChange}
                value={formData.bathRooms}
                type="number"
                min={1}
                max={14}
                id="bathRooms"
                className="h-10 w-20 rounded p-3 border border-gray-600"
              />
              <span>Baths</span>
            </div>
            {formData.offer === true && (
              <>
                {" "}
                <div className="flex gap-2">
                  <input
                    onChange={handleChange}
                    min={50}
                    max={10000}
                    value={formData.regularPrice}
                    type="number"
                    id="regularPrice"
                    className="h-10 w-20 rounded p-3 border border-gray-600"
                  />
                  <div className=" flex flex-col items-center">
                    <span>Regular Price</span>
                    <span className="text-xs">($ per month)</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    min={1}
                    max={10}
                    onChange={handleChange}
                    value={formData.discountPrice}
                    type="number"
                    id="discountPrice"
                    className="h-10 w-20 rounded p-3 border border-gray-600"
                  />
                  <div className=" flex flex-col items-center">
                    <span>Discounted Price</span>
                    <span className="text-xs">($ per month)</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6 mt-2">
          <h1 className="uppercase">
            <span className="font-medium mx-3">images:</span>you can upload upto
            sex images
          </h1>
          <div className="flex items-center gap-3">
            <input
              onChange={(e) => setFiles(e.target.files)}
              type="file"
              multiple
              accept="image/*"
              id="image"
              className="p-3 bg-transparent border border-gray-600 rounded-lg"
            />
            <button
              type="button"
              onClick={handleImageSubmit}
              className="p-3 rounded-lg border border-gray-500 text-blue-700 uppercase"
            >
              Upload
            </button>
          </div>
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((url, index) => (
              <div
                key={index}
                className=" flex items-center justify-between p-2 border border-gray-300 rounded-lg"
              >
                <img
                  className=" w-3/5 h-20 object-cover rounded-lg"
                  src={url}
                  alt="listing image"
                />
                <button
                  onClick={() => handleRemove(index)}
                  type="button"
                  className=" uppercase text-red-700 hover:opacity-85 font-medium px-3"
                >
                  Delete
                </button>
              </div>
            ))}
          {error && <p>{error}</p>}
          <button className="uppercase bg-blue-600 py-3 rounded-lg hover:opacity-85">
            {loading ? "Loading" : "create Listing"}
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
