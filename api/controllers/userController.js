import bcryptjs from "bcryptjs";
import User from "../model/user.js";
export const updateUser = async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          userName: req.body.userName,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          profilePic: req.body.profilePic,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const getCookie = (req, res, next) => {
  try {
    const token = req.cookies;
    if (!token) throw new Error("token not found");
    res.json(token);
  } catch (error) {
    next(error);
  }
};
