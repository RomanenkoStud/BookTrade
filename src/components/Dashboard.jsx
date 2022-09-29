import React from "react";
import SidebarMenu from "../components/SidebarMenu"
import Search from "../components/Search";
import '../style/Dashboard.css'

function Dashboard() {
  return (
    <div>
        <SidebarMenu />
        <div className="main">
            <Search />
        </div>
    </div>
  );
}

export default Dashboard;