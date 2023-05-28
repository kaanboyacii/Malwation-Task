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

const List = ({ type }) => {
  // const [projects, setProjects] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  // useEffect(() => {
  //   const fetchProjects = async () => {
  //     const res = await axios.get(`/projects/findByUser/${currentUser._id}`);
  //     setProjects(res.data);
  //   };
  //   fetchProjects();
  // }, [type]);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow className="tableHead">
            <TableCell className="tableCell">Proje adı</TableCell>
            <TableCell className="tableCell">Açıklama</TableCell>
            <TableCell className="tableCell">Durum</TableCell>
            <TableCell className="tableCell">Bakiye</TableCell>
            <TableCell className="tableCell">Kar</TableCell>
            <TableCell className="tableCell">Son ödeme</TableCell>
            <TableCell className="tableCell">Son maliyet</TableCell>
            <TableCell className="tableCell">Detay</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
          {projects.map((project) => (
            <TableRow key={project._id} className="tableRow">
              <TableCell className="tableCell">{project.title}</TableCell>
              <TableCell className="tableCell">{project.desc}</TableCell>
              <TableCell className="tableCell">{project.status}</TableCell>
              <TableCell className="tableCell">{project.balance} ₺</TableCell>
              <TableCell className="tableCell">{project.earning} ₺</TableCell>
              <TableCell className="tableCell">
                {project.costs.slice(-1).map((cost) => (
                  <div key={cost.title}>
                    <p>Başlık: {cost.title}</p>
                    <p>Miktar: {cost.amount} ₺</p>
                  </div>
                ))}
              </TableCell>
              <TableCell className="tableCell">
                {project.payments.slice(-1).map((payment) => (
                  <div key={payment.title}>
                    <p>Başlık: {payment.title}</p>
                    <p>Miktar: {payment.amount} ₺</p>
                  </div>
                ))}
              </TableCell>
              <TableCell className="tableCell">
                <Link to={`/projects/${project._id}`}>
                  <button className="detailsButton">Detaylar</button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
};

export default List;
