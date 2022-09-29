import React from "react";
import { useNavigate } from "react-router-dom";

function SidebarMenu(props) {
	const navigate = useNavigate();
    return (
        <div className="sidenav">
			<a href="/">My Collection</a>
			<a href="/">Browse</a>
			<a href="/">History</a>
			<a href="/">Profile</a>
			<a id="logout" href="/" onClick={navigate("/login")}>Logout</a>
		</div>
    );
}

export default SidebarMenu;