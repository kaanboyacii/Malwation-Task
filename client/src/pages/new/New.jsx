import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const New = () => {
  const [projects, setProjects] = useState([]);
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

    const { title, desc, status } = inputs;

    if (!title || !desc || !status) {
      setErrorMessage("Lütfen tüm alanları doldurunuz.");
      return;
    }

    try {
      const res = await axios.post("/projects", { ...inputs });
      if (res.status === 200) {
        navigate(`/projects/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Yeni Proje Oluştur</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Proje Adı</label>
                <input type="text" name="title" onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Açıklama</label>
                <input type="text" name="desc" onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>Durum</label>
                <input type="text" name="status" onChange={handleChange} required />
              </div>
              <div className="formInput">
                <label>İletişim</label>
                <input type="text" name="contact" onChange={handleChange} required />
              </div>
            <button onClick={handleUpload}>Proje Oluştur</button>
            {errorMessage && <div className="errorMessage">{errorMessage}</div>}            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
