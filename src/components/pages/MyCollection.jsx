import React, {useState, useEffect} from "react";
import BookList from "../BookList";
import BookService from "../../services/book.service";

function MyCollection(props) {
	const [books, setBooks] = useState([]);
	useEffect(() => {
    	if(props.user){
		BookService.getBooks(props.user.id, props.user.token).then(
			response => {
			  setBooks(response.data);
			},
			error => {
			  setBooks(
				  (error.response && error.response.data) ||
				  error.message ||
				  error.toString());
			}
		  );}
	  }, [props.user]);
    return (
		<div className="container_align content">
			<BookList books={books} editable={true}/>
		</div>
    );
}

export default MyCollection;