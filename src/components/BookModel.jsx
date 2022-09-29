import React from "react";

function BookModel(props) {
    return (
        <div className="book">
			<div className="cover"><div className="cover-inner">
				<div className="cover-front" style={{ backgroundImage: `url("/images/${props.cover}.jpg")` }}></div>
				<div className="cover-back">{props.description}</div>	
			</div></div>
			<p className="book_title">{props.title}</p>
			<p className="book_author">{props.author}</p>	
		</div>
    );
}

export default BookModel;