import React from "react";
import BookList from "../components/BookList"
import { stockData } from "../data";

function MyCollection() {
    return (
		<div>
			<BookList books={stockData} />
		</div>
    );
}

export default MyCollection;