import express from "express";
import { addEvent, updateEvent, deleteEvent, getAllEvent, getEvent, getEventsByUserId, search, random } from "../controllers/event.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();
//get all events
router.get("/", verifyToken, getAllEvent)
//add new event
router.post("/", verifyToken, addEvent)
//update event
router.put("/:id", verifyToken, updateEvent)
//delete event
router.delete("/:id", verifyToken, deleteEvent)
//get event by id
router.get("/find/:id", getEvent)
//get all events by user id
router.get("/findByUser/:userId", getEventsByUserId)
//get event random
router.get("/random", random)
//search event
router.get("/search", search)

export default router;