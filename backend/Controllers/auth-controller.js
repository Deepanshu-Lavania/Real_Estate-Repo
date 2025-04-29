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
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    console.log("validUser in singin for backend is : ",validUser);
    
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

const google =async(req,res,next)=>{
  const {name, email, photo}=req.body
  try {
    const user = await User.findOne({email});
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });      
      const {password:pass, ...rest}=user._doc
      res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json(rest);
    }else{
      const generatedPassword=Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(generatedPassword, salt);

      const newUser  = new User({username:name.split(" ").join("").toLowerCase()+ Math.random().toString(36).slice(-4), email:email, password:hashedPassword, avatar:photo})
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });      
      const {password:pass, ...rest}=newUser._doc
      res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // true in prod
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .json(rest);

    }
  } catch (error) {
    console.log("google backend error : ",error);
    next(error)
  }
}
export { signup, signin , google};
