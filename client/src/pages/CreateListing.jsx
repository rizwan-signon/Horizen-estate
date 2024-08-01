import { useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase";

const CreateListing = () => {
  const [files, setFiles] = useState([]);
  console.log(files);
  const [formData, setFormData] = useState({ imageUrls: [] });
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
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

  return (
    <main className=" max-w-5xl mx-auto mt-4 py-2">
      <h1 className="font-medium text-2xl sm:text-4xl text-center my-7 text-gray-500">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 px-4">
        <div className="w-full sm:w-1/2">
          <input
            onChange={handleFormData}
            type="text"
            placeholder="name.."
            id="name"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <textarea
            type="text"
            placeholder="description.."
            id="description"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <input
            type="text"
            placeholder="address.."
            id="address"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <div className="flex gap-6 flex-wrap mt-10">
            <div className=" flex gap-2">
              <input type="checkbox" id="sell" className="w-6" />
              <span>sell</span>
            </div>
            <div className="flex  gap-2">
              <input type="checkbox" id="rent" className="w-6" />
              <span>rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-6" />
              <span>parking lot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-6" />
              <span>fernished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-6" />
              <span>Offer</span>
            </div>
          </div>

          <div className=" flex flex-wrap mt-10 gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                className="h-10 w-20 rounded p-3 border border-gray-600"
              />
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathRooms"
                className="h-10 w-20 rounded p-3 border border-gray-600"
              />
              <span>Baths</span>
            </div>
            <div className="flex gap-2">
              <input
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
                type="number"
                id="discountPrice"
                className="h-10 w-20 rounded p-3 border border-gray-600"
              />
              <div className=" flex flex-col items-center">
                <span>Discounted Price</span>
                <span className="text-xs">($ per month)</span>
              </div>
            </div>
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
          <button className="uppercase bg-blue-600 py-3 rounded-lg hover:opacity-85">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
