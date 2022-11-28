import React, {useState, useEffect} from "react";
import RequestModel from "../RequestModel";

function History(props) {
	const [requests, setRequests] = useState([]);
	useEffect(() => {
    	if(props.user){
		}
	}, [props.user]);
    return (
		<div className="container_align content">
            {props.books&&props.books.map((data, key) => {
                return (
                    <div key={key} onClick={()=>props.event(data)}>
                        {}
                    </div>
                );
            })}
            <RequestModel sender="user" reciever="user" offer="book" pending={true} />
            <RequestModel sender="user" reciever="user" offer="book" pending={false} state="accepted"/>
		</div>
    );
}

export default History;