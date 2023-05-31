import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import Detail from "../detail/Detail";

const Datatable = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [event, setEvent] = useState([]);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Enable or disable dark mode
      primary: {
        main: "#82C3EC", // Header text color
      },
      secondary: {
        main: "#4B56D2", // Text color in odd rows
      },
    },
  });

  const handleDetailClick = (eventId) => {
    setSelectedEventId(eventId);
    setOpenDetail(true);

    const selectedEvent = events.find((event) => event._id === eventId);
    setEvent(selectedEvent);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/events/");
      setEvents(res.data);
    };
    fetchEvents();

    const fetchUsers = async () => {
      const res = await axios.get("/users/");
      setUsers(res.data);
    };
    fetchUsers();
  }, [type]);

  const columns = [
    { field: "title", headerName: "Title", width: 240 },
    { field: "desc", headerName: "Description", width: 290 },
    { field: "location", headerName: "Location", width: 240 },
    {
      field: "date",
      headerName: "Date",
      width: 140,
    },
    {
      field: "userName",
      headerName: "Event Owner",
      width: 140,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <button
          onClick={() => handleDetailClick(params.row.id)}
          className="deleteButton"
        >
          Details
        </button>
      ),
    },
  ];

  let rows = [];

  rows = events.map((event, index) => {
    const user = users.find((user) => user._id === event.userId); // Update the property name here
    return {
      id: event._id || index,
      title: event.title,
      desc: event.desc,
      location: event.location,
      date: event.date
        ? new Date(event.date).toLocaleDateString()
        : "unexplained",
      userName: user ? user.name : "unknown",
    };
  });

  const getRowId = (row) => row.id;

  const renderPageCount = (params) => {
    const { pagination } = params;
    const pageCount = Math.ceil(pagination.rowCount / pagination.pageSize);
    return `${pageCount} sayfada gösterilen sayfa sayısı`;
  };

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          components={{
            Toolbar: GridToolbar,
          }}
          pagination
          paginationMode="server"
          pageSize={5}
          rowCount={rows.length}
          onPageChange={(params) => console.log(params)}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={getRowId}
        />
      </div>
      {openDetail && (
        <Detail setOpenDetail={setOpenDetail} eventId={selectedEventId} />
      )}
    </ThemeProvider>
  );
};

export default Datatable;
