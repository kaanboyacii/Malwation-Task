import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const New = () => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({});
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();

    const { title, desc, location } = inputs;

    if (!title || !desc || !location) {
      setErrorMessage("Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      const res = await axios.post("/events", { ...inputs });
      if (res.status === 200) {
        navigate(`/events/`);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // Hata mesajını ayarla
      } else {
        setErrorMessage("Bir hata oluştu."); // Genel hata mesajı
      }
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Event</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Event Title</label>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="formInput">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  required
                />
              </div>
              <button onClick={handleUpload}>Create Event</button>
              {errorMessage && (
                <div className="errorMessage">{errorMessage}</div>
              )}{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
