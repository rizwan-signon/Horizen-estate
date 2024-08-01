import Listing from "../model/listing.model.js";
export const createListing = async (req, res, next) => {
  const newListing = await Listing.create(req.body);
  await newListing.save();
  res.json(newListing);
};
