import Listing from "../model/listing.model.js";
export const createListing = async (req, res, next) => {
  try {
    const newListing = await Listing.create(req.body);
    await newListing.save();
    res.json(newListing);
  } catch (error) {
    next(error);
  }
};
//get Listings
export const getListings = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  }
};
