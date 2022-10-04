import React, {useState} from "react";
import BookList from "../components/BookList";
import { stockData } from "../data";

function Search() {
	const [inputText, setInputText] = useState("");
	const books = stockData.filter((el) => {
        //if no input the return the original
        if (inputText === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.title.toLowerCase().includes(inputText)
        }
    })
  	let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };
    return (
		<div>
			<div className="input-group rounded search_bar">
				<input type="search" onChange={inputHandler} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
				<span className="input-group-text border-0" id="search-addon">
					<i className="fas fa-search"></i>
				</span>
			</div>
			<div className="search_result">
				<BookList books={books} />
			</div>
		</div>
    );
}

export default Search;