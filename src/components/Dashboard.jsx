import React, {useState} from "react";
import SidebarMenu from "../components/SidebarMenu"
import Search from "../components/Search";
import '../style/Dashboard.css'
import MyCollection from "../components/MyCollection";
import Pages from "../components/Pages"

function Dashboard({setLogin}) {
  const [active, setActive] = useState("dashboard");
  return (
    <div>
        <SidebarMenu active={active} activate={setActive} setLogin={setLogin}/>
        <Pages active={active}>
              <Search name="browse"/>
              <MyCollection name="dashboard"/>
        </Pages>
    </div>
  );
}

export default Dashboard;