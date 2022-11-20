import React from "react";

function BookModel(props) {
	const textStyle={color: 'black'};
	const descrStyle={background: '#676770'};
    return (
        <div className="book">
			<div className="cover"><div className="cover-inner">
				<div className="cover-front" style={{ backgroundImage: `url("${props.cover}")` }}></div>
				<div className="cover-back" style={props.form&&descrStyle}><p>{props.description}</p></div>	
			</div></div>
			<p className="book_title">{props.title}</p>
			<p className="book_author" style={props.form&&textStyle}>{props.author}</p>	
		</div>
    );
}

export default BookModel;