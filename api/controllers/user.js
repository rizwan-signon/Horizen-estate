import User from "../model/user.js";
import bcryptjs from "bcryptjs";
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
    console.log(error);
  }
};
