import mongoose from "mongoose";
import User from "../models/User.js"
import bcrypt from "bcrypt";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    // Store hash in your password DB.
    const newUser = new User({ ...req.body, password: hash });
    await newUser.save();
    res.status(200).send("User has been created !");
  } catch (err) {
    next(err)
    //createError(404,"Something went wrong !")
  }
}

export const signin = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found !"));

    const isCorrect = await bcrypt.compare(req.body.password, user.password);
    if (!isCorrect) return next(createError(400, "Wrong credentials !"));

    const token = jwt.sign({ id: user._id }, process.env.JWT);
    const { password, ...others } = user._doc;

    res.cookie("access_token", token, {
      httpOnly: true
    }).status(200).json(others)

  } catch (err) {
    next(err)
    //createError(404,"Something went wrong !")
  }
}

export const logout = async (req, res, next) => {
  try {
    // Get the JWT from the request header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the JWT to ensure that it's valid
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token' });
      }

      // Delete the JWT from the client-side
      // In this example, we'll simply return a success message
      return res.status(200).json({ message: 'Successfully logged out' });
    });

  } catch (err) {
    next(err)
    //createError(404,"Something went wrong !")
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(savedUser._doc);
    }
  } catch (err) {
    next(err);
  }
};