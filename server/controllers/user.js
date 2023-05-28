import { createError } from "../error.js";
import User from "../models/User.js"
import bcrypt from "bcrypt";

export const updateImg = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return next(createError(404, "User not found!"));
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { img: req.body.img }, // update the user's img field with the new value
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      next(err);
    }
  };
  

export const update = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(req.body.password, salt);
            const updatedUser = await User.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                    password: hash
                },
                { new: true }
            );
            res.status(200).json(updatedUser);
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can update only your account!"));
    }
};

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("User has been deleted");
        } catch (err) {
            next(err);
        }
    } else {
        return next(createError(403, "You can delete only your account!"));
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        next(err)
    }
}