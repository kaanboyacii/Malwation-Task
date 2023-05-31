import "./detail.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const Detail = ({ setOpenDetail, eventId }) => {
  const dispatch = useDispatch();
  const [event, setEvent] = useState();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`/events/find/${eventId}`);
        setEvent(res.data);
      } catch (error) {
        // Handle error if event fetching fails
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

  const getUserName = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "unknown";
  };

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenDetail(false)}>
          X
        </div>
        {event && (
          <div className="eventDetails">
            <h2 className="eTitle">{event.title}</h2>
            <p className="description">Description: {event.desc}</p>
            <p className="location">Location: {event.location}</p>
            <p className="date">
              Date:{" "}
              {event.date
                ? new Date(event.date).toLocaleString()
                : "unexplained"}
            </p>
            <p className="userName">Event owner: {getUserName(event.userId)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
