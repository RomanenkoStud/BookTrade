import React from "react";
import BookModel from "../components/BookModel"
import { stockData } from "../data";

function BookList(props) {
    const filteredData = stockData.filter((el) => {
        //if no input the return the original
        if (props.input === '') {
            return el;
        }
        //return the item which contains the user input
        else {
            return el.title.toLowerCase().includes(props.input)
        }
    })
        return (
            <div className="books_container">
                {filteredData.map((data, key) => {
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