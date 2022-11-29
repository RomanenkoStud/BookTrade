import React, {useState, useEffect} from "react";
import RequestModel from "../RequestModel";
import ExchangeService from "../../services/exchange.service";

function History(props) {
	const [requests, setRequests] = useState([]);
    
	useEffect(() => {
    	if(props.user){
            ExchangeService.getRequests(props.user.id, props.user.token).then(
			response => {
			    setRequests(response.data);
                console.log(response.data);
			},
			error => {
			    setRequests(
				    (error.response && error.response.data) ||
				    error.message ||
				    error.toString());
			}
		    );}
	    }, [props.user]);

    return (
		<div className="container_align content">
            {requests&&requests.map((data, key) => {
                return (
                    <div key={key} onClick={()=>props.event(data)}>
                        {<RequestModel 
                        sender={data.username} 
                        trade={data.recipientBookTitle} 
                        offer={data.senderBookTitle}
                        status={data.status} />}
                    </div>
                );
            })}
		</div>
    );
}

export default History;