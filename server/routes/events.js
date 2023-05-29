import express from "express";
import { addEvent, updateEvent, deleteEvent, getAllEvent, getEvent, getEventsByUserId, search, random} from "../controllers/event.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

router.get("/", verifyToken, getAllEvent)
router.post("/", verifyToken, addEvent)
router.put("/:id", verifyToken, updateEvent)
router.delete("/:id", verifyToken, deleteEvent)
router.get("/find/:id", getEvent)
router.get("/findByUser/:userId", getEventsByUserId)
router.get("/random", random)
router.get("/search", search)

export default router;