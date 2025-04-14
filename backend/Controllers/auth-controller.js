import { User } from "../models/user-model.js";
import bcrypt from "bcryptjs";
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
//   const checkEmail = await User.find({email})
//   if (checkEmail) {
//     return res.send("Email already exists");
//   }
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
export { signup };
