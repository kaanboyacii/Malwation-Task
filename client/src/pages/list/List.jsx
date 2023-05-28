import "./list.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Table from "../../components/table/Table"
import { Link } from "react-router-dom"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        <Table/>
        <div className="addProjectButton">
        <Link to={"/projects/new"}>
          <button className="newProjectButton">Yeni Proje Ekle</button>
        </Link>
      </div>
      </div>
    </div>
  )
}

export default List