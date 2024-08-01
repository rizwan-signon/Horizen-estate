const CreateListing = () => {
  return (
    <main className=" max-w-5xl mx-auto mt-4 py-2">
      <h1 className="font-medium text-2xl sm:text-4xl text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-4 px-4">
        <div className="w-full sm:w-1/2">
          <input
            type="text"
            placeholder="name.."
            id="name"
            className=" w-full bg-gray-300 p-3 border rounded-xl my-3"
          />
          <textarea
            type="text"
            placeholder="description.."
            id="description"
            className=" w-full bg-gray-300 p-3 border rounded-xl py-3"
          />
          <input
            type="text"
            placeholder="address.."
            id="address"
            className=" w-full bg-gray-300 p-3 border rounded-xl py-3"
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
          <h1>
            <span className="font-medium">images:</span>the ist image will be
            cover
          </h1>
          <div className="flex items-center gap-3">
            <input
              type="file"
              multiple
              accept="image/*"
              id="images"
              className="p-3 bg-transparent border border-gray-600 rounded-lg"
            />
            <button className="p-3 rounded-lg border border-gray-500 text-blue-700 uppercase">
              Upload
            </button>
          </div>
          <button className="uppercase bg-blue-600 py-3 rounded-lg hover:opacity-85">
            Create listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
