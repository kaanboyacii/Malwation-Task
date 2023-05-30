import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";

const Datatable = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const { darkMode } = useContext(DarkModeContext);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light", // Dark mode'u etkinleştirin veya devre dışı bırakın
      primary: {
        main: "#82C3EC", // Başlık yazı rengi
      },
      secondary: {
        main: "#4B56D2", // Tek numaralı satırlardaki yazı rengi
      },
    },
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/events/");
      setEvents(res.data);
    };
    fetchEvents();
  }, [type]);

  const columns = [
    { field: "title", headerName: "Title", width: 240 },
    { field: "desc", headerName: "Description", width: 290 },
    { field: "location", headerName: "Location", width: 240 },
    {
      field: "date",
      headerName: "Date",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => <button className="deleteButton">Details</button>,
    },
  ];

  let rows = [];

  rows = events.map((event, index) => ({
    id: event._id || index, // event._id mevcutsa kullan, değilse bir indeks değeri kullan
    title: event.title,
    desc: event.desc,
    location: event.location,
    date: event.date
      ? new Date(event.date).toLocaleDateString()
      : "unexplained",
  }));

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
    </ThemeProvider>
  );
};

export default Datatable;
