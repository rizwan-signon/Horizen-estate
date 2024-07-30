import User from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
export const signUp = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    if (!userName || !email || !password)
      throw new Error("all fields are required");
    const hashPassword = bcryptjs.hashSync(password, 10);
    const user = new User({ userName, email, password: hashPassword });
    await user.save();
    return res.json(user);
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) throw new Error("all fields are required");
    const validateUser = await User.findOne({ email: email });
    if (!validateUser) throw new Error("user not found");
    const validatePass = bcryptjs.compareSync(password, validateUser.password);
    if (!validatePass) throw new Error("wrong Credentials");
    const { password: pass, ...rest } = validateUser._doc;
    const token = jwt.sign({ id: validateUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .cookie("access-Token", token, {
        maxAge: 60 * 60 * 1 * 24 * 3,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
