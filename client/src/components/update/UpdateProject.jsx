import "./update.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchSuccess } from "../../redux/projectSlice.js";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateProject = ({ setOpenProject }) => {
  const { currentProject } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState(currentProject);
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await axios.put(`/projects/${currentProject._id}`, inputs);
    setOpenProject(false);
    res.status === 200 && navigate(`/projects/${res.data._id}`);
    window.location.reload();
    // Clear input values
    setInputs({});
  };
  

  return (
    <div className="container">
      <div className="wrapperU">
        <div className="close" onClick={() => setOpenProject(false)}>
          X
        </div>
        <h1 className="title">Projeyi düzenle</h1>
        <label className="label">Başlık:</label>
        <input
          type="text"
          name="title"
          value={inputs.title}
          onChange={handleChange}
          className="input"
        />
        <label className="label">Açıklama:</label>
        <input
          type="text"
          value={inputs.desc}
          name="desc"
          onChange={handleChange}
          className="input"
        />
        <label className="label">Durum:</label>
        <input
          type="text"
          value={inputs.status}
          name="status"
          onChange={handleChange}
          className="input"
        />
        <label className="label">İletişim:</label>
        <input
          type="text"
          value={inputs.contact}
          name="contact"
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
