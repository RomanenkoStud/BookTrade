import React from "react";
import BookModel from "../components/BookModel";

function BookList(props) {
        return (
            <div className="books_container">
                {props.books.map((data, key) => {
                return (
                    <div key={key}>
                    {<BookModel cover={data.cover} title={data.title} 
                    author={data.author} description={data.description} />}
                    </div>
                );
                })}
            </div>
            );
    }

export default BookList;