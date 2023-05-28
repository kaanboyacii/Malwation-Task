import express from "express";
import {
    update,
    deleteUser,
    getUser,
    updateImg,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//update user's image
router.put("/updateImg/:id", verifyToken, updateImg);

//update user
router.put("/:id", verifyToken, update);

//delete user
router.delete("/:id", verifyToken, deleteUser);

//get a user
router.get("/find/:id", getUser);

export default router;