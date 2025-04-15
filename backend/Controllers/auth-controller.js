import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
import { ManualErrorHandler } from "../utils/CustomErrorHandler.js";
import jwt from "jsonwebtoken";
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    username,
    email,
    password: hashPassword,
  });
  try {
    await newUser.save();
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(ManualErrorHandler(404, "User not found! "));
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword)
      return next(ManualErrorHandler(401, "Wrong Credentials"));

    //* if user is valid then we have to authenticate the user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d",
    });
    console.log("validUser is ", validUser);
    
    const { password:pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json({ message: "Signin successful", rest });
  } catch (error) {
    next(error);
  }
};
export { signup, signin };
