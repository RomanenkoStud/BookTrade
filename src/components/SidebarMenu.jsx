import React from "react";

function SidebarMenu(props) {
    return (
        <div className="sidenav">
			<a href="javascript:void(0)" 
				className={props.active === 'dashboard' ? 'selected' : ''} 
				onClick={()=>{props.activate("dashboard")}}>My Collection</a>
			<a href="javascript:void(0)" 
				className={props.active === 'browse' ? 'selected' : ''} 
				onClick={()=>{props.activate("browse")}}>Browse</a>
			<a href="javascript:void(0)" 
				className={props.active === 'history' ? 'selected' : ''} 
				onClick={()=>{props.activate("history")}}>History</a>
			<a href="javascript:void(0)" 
				className={props.active === 'profile' ? 'selected' : ''} 
				onClick={()=>{props.activate("profile")}}>Profile</a>
			<a id="logout" href="javascript:void(0)" onClick={()=>{props.setLogin(false)}}>Logout</a>
		</div>
    );
}

export default SidebarMenu;