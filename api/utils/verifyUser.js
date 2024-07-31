import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_Token;
  try {
    if (!token) throw new Error("token not found");
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) throw new Error("there is some error while verifing token");
      req.user = user;
      next();
    });
  } catch (error) {
    next(error);
  }
};
