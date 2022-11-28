import React from "react";
import { FaExchangeAlt } from 'react-icons/fa';

function RequestModel(props) {
    return (
        <div className="request" style={props.pending ? {color:"white"} : null}>
			<p className="request_info">{props.sender}</p>
            <p className="request_info">{props.offer}</p>
            <FaExchangeAlt style={{height: '18px'}} className="exchange_i"/>
            <p className="request_info">{props.offer}</p>
            {props.pending ? 
                (<div className="request-button-container">
                    <button className="request-button button-yes">Accept</button>
                    <button className="request-button button-not">Decline</button>
                </div>) :
                (<p>{props.state}</p>)
            }
		</div>
    );
}

export default RequestModel;