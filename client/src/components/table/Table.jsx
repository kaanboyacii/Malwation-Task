import "./table.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Detail from "../detail/Detail";

const Table1 = ({ type }) => {
  const [events, setEvents] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`/events/findByUser/${currentUser._id}`);
      setEvents(res.data);
    };
    fetchEvents();
  }, [type, currentUser._id]);

  const handleDetailClick = (eventId) => {
    setSelectedEventId(eventId);
    setOpenDetail(true);
  };

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="tableHead">
            <TableCell className="tableCell">Event title</TableCell>
            <TableCell className="tableCell">Description</TableCell>
            <TableCell className="tableCell">Location</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Details</TableCell>
            <TableCell className="tableCell">Update</TableCell>
            <TableCell className="tableCell">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events.map((event) => (
            <TableRow key={event._id} className="tableRow">
              <TableCell className="tableCell">{event.title}</TableCell>
              <TableCell className="tableCell">{event.desc}</TableCell>
              <TableCell className="tableCell">{event.location}</TableCell>
              <TableCell className="tableCell">
                {event.date
                  ? new Date(event.date).toLocaleString()
                  : "unexplained"}
              </TableCell>
              <TableCell className="tableCell">
                <button onClick={() => handleDetailClick(event._id)} className="detailsButton">Details</button>
              </TableCell>
              <TableCell className="tableCell">
                <button className="updateButton">Update</button>
              </TableCell>
              <TableCell className="tableCell">
                <button className="deleteButton">Delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {openDetail && <Detail setOpenDetail={setOpenDetail} eventId={selectedEventId} />}
    </TableContainer>
  );
};

export default Table1;
