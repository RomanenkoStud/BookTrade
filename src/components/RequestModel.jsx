import React from "react";
import { FaExchangeAlt } from 'react-icons/fa';

function RequestModel(props) {
    const statusCode = {
        "ACCEPTED": 1,
        "CANCELED": 2,
        "PENDING": 0
    };
    return (
        <div className="request" style={!statusCode[props.status] ? {color:"white"} : null}>
			<p className="request_info">{props.sender}</p>
            <p className="request_info">{props.offer}</p>
            <FaExchangeAlt style={{height: '18px'}} className="exchange_i"/>
            <p className="request_info">{props.trade}</p>
            {!statusCode[props.status] ? 
                (<div className="request-button-container">
                    <button className="request-button button-yes">Accept</button>
                    <button className="request-button button-not">Decline</button>
                </div>) :
                (<p>{props.status}</p>)
            }
		</div>
    );
}

export default RequestModel;