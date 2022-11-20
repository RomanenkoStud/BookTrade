import React, {useState, useEffect} from "react";
import BookList from "../BookList";
import BookService from "../../services/book.service";

function Search(props) {
	const [inputText, setInputText] = useState("");
  const [booksAll, setBooks] = useState([]);
	useEffect(() => {
		BookService.getBooksAll(20).then(
      response => {
        setBooks(response.data);
      },
      error => {
        setBooks(
            (error.response && error.response.data) ||
            error.message ||
            error.toString());
      }
    );
	  }, []);
    
	const books = booksAll.filter((el) => {
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
		<div className="content">
			<div className="input-group rounded search_bar">
				<input type="search" onChange={inputHandler} className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
				<span className="input-group-text border-0" id="search-addon">
					<i className="fas fa-search"></i>
				</span>
			</div>
			<div className="search_result">
        <div className="container_align">
				  <BookList books={books} editable={false} event={props.event}/>
        </div>
			</div>
		</div>
    );
}

export default Search;