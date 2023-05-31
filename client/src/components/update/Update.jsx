import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProject = ({ setOpenUpdate, eventId }) => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setEvent((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/find/${eventId}`);
        setEvent(res.data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
      }
    };
    const fetchUsers = async () => {
      const res = await axios.get("/users/");
      setUsers(res.data);
    };
    fetchUsers();

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);
  console.log(event);
  if (event) {
    console.log(event);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/events/${eventId}`, event);
    setOpenUpdate(false);
    res.status === 200 && navigate("/events");
    window.location.reload();
    // Clear input values
    setEvent({});
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenUpdate(false)}>
          X
        </div>
        <h1 className="title">Edit event</h1>
        <label className="label">Event Title:</label>
        <input
          type="text"
          name="title"
          value={event?.title || ""}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Description:</label>
        <input
          type="text"
          value={event?.desc || ""}
          name="desc"
          onChange={handleChange}
          className="input"
        />
        <label className="label">Location:</label>
        <input
          type="text"
          value={event?.location || ""}
          name="location"
          onChange={handleChange}
          className="input"
        />
        <label className="label">Date:</label>
        <input
          type="date"
          value={event?.date ? formatDate(event.date) : ""}
          name="date"
          onChange={handleChange}
          className="input"
        />
        <button onClick={handleUpdate} className="button">
          Güncelle
        </button>
      </div>
    </div>
  );
};

export default UpdateProject;
