import React from "react";

function SidebarMenu(props) {
    return (
        <div className="sidenav">
			<a href="/"
				className={props.active === 'dashboard' ? 'selected' : ''} 
				onClick={(e)=>{e.preventDefault(); props.activate("dashboard")}}>My Collection</a>
			<a href="/"
				className={props.active === 'browse' ? 'selected' : ''} 
				onClick={(e)=>{e.preventDefault(); props.activate("browse")}}>Browse</a>
			<a href="/"
				className={props.active === 'history' ? 'selected' : ''} 
				onClick={(e)=>{e.preventDefault(); props.activate("history")}}>History</a>
			<a href="/"
				className={props.active === 'profile' ? 'selected' : ''} 
				onClick={(e)=>{e.preventDefault(); props.activate("profile")}}>Profile</a>
			<a id="logout" href="/" onClick={(e)=>{e.preventDefault(); props.setLogin(false)}}>Logout</a>
		</div>
    );
}

export default SidebarMenu;