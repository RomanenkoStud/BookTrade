import React from "react";

function Pages({active, children}) {
    return (
        <div className="main">
            {children.filter(child => child.props.name === active)}
        </div>
    )
}

export default Pages;