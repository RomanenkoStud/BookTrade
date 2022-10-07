import React from "react";
import BookList from "../BookList";
import { stockData } from "../../data";

function MyCollection() {
    return (
		<div className="container_align">
			<BookList books={stockData} editable={true}/>
		</div>
    );
}

export default MyCollection;