import { createError } from "../error.js";
import User from "../models/User.js"
import Event from "../models/Event.js";

export const addEvent = async (req, res, next) => {
  const newEvent = new Event({ userId: req.user.id, ...req.body });
  try {
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent)
  } catch (err) {
    next(err)
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id)
    if (!event) return next(createError(404, "Event not found !"));
    if (req.user.id === event.userId) {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            },
        );
        res.status(200).json(updatedEvent)
    } else {
        return next(createError(403, "You can update only your Event!"));
    }
} catch (err) {
    next(err)
}
};

export const deleteEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return next(createError(404, 'Event not found!'));
    if (req.user.id === event.userId) {
      const deletedEvent = await Event.findByIdAndDelete(req.params.id);
      res.status(200).json('Event has been deleted.');
    } else {
      return next(createError(403, 'You can delete only your Event!'));
    }
  } catch (error) {
    next(error);
  }
};

export const getAllEvent = async (req, res, next) => {
  try {
    const Events = await Event.find({});
    res.status(200).json(Events);
  } catch (err) {
    next(err);
  }
};


export const getEvent = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    res.status(200).json(event);
  } catch (err) {
    next(err)
  }
};

export const getEventsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const Events = await Event.find({ userId });
    res.status(200).json(Events);
  } catch (err) {
    next(err);
  }
};

export const random = async (req, res, next) => {
  try {
    const Events = await Event.aggregate([{ $sample: { size: 40 } }]);
    res.status(200).json(Events);
  } catch (err) {
    next(err);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const Events = await Event.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(Events);
  } catch (err) {
    next(err);
  }
};