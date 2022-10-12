import React from "react";
import BookModel from "../components/BookModel";
import { Link } from "react-router-dom";

function BookList(props) {
        return (
            <div className="books_container">
                {props.books.map((data, key) => {
                return (
                    <div key={key}>
                    {<BookModel cover={data.cover} title={data.title} 
                    author={data.author} description={data.description} />}
                    </div>
                );})}
                {props.editable && (<Link to={"/add_book"} style={{textDecoration: 'none'}}><BookModel cover={"default"} title={"Add book"}
                    author={undefined} description="Click to add new book"/></Link>)}
            </div>
            );
    }

export default BookList;