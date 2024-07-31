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
      .cookie("access_Token", token, {
        maxAge: 60 * 60 * 24 * 3 * 1000,
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
//signin with google
export async function signinWithGoogle(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password: hashPassword, ...rest } = user._doc;
      res
        .cookie("access_Token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 3 * 1000,
        })
        .json(rest);
    } else {
      const generatePass =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPass = bcryptjs.hashSync(generatePass, 10);
      const newUser = new User({
        userName: req.body.name,
        email: req.body.email,
        password: hashPass,
        profilePic: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      const { password: hashPassword, ...rest } = newUser._doc;
      res
        .cookie("access_Token", token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 3 * 1000,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
}

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_Token");
    res.status(200).json("user signed out successfully");
  } catch (error) {
    next(error);
  }
};
