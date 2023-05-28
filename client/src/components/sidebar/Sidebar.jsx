import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "../../redux/userSlice.js";
import Logo from "../../img/logo.png";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { darkMode } = useContext(DarkModeContext);
  const dispatchL = useDispatch();

  const handleLogout = async (e) => {
    window.location.href = "/";
    e.preventDefault();
    dispatchL(logout());
    const res = await axios.post("/auth/logout");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img
            className="logo"
            src={darkMode ? Logo : Logo}
            alt=""
          />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">YÖNETİM</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Anasayfa</span>
            </li>
            <p className="title">LİSTE</p>
          </Link>
          <Link to="/projects" style={{ textDecoration: "none" }}>
            <li>
              <AssignmentIcon className="icon" />
              <span>Projeler</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Maliyetler</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Ödemeler</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Siparişler</span>
          </li>
          <p className="title">KULLANIM</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>İstatistikler</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Bildirimler</span>
          </li>
          <p className="title">SERVİS</p>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Kayıtlar</span>
          </li>
          <li>
            <SettingsIcon className="icon" />
            <span>Ayarlar</span>
          </li>
          <p className="title">KULLANICI</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profil</span>
          </li>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Çıkış yap</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
