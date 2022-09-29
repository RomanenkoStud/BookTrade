import React, {useState} from "react";
import BookList from "../components/BookList"

function Search() {
	const [inputText, setInputText] = useState("");
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
			<BookList input={inputText} />
		</div>
    );
}

export default Search;