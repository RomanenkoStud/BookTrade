import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import UserService from "../../services/user.service";
import BookList from "../BookList";
import "../../style/Home.css"
import BookService from "../../services/book.service";
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    BookService.getBooksAll(9).then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }
  
  render() {
    var array = [];
    for(var key in this.state.content){
    if(!this.state.content.hasOwnProperty(key)){
        continue;
    }
    array.push(this.state.content[key])
    }

    return (
      <div className="content">
        <div className="hero">
          <div className="hero-image" style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url("/images/hero-books.jpg")'}}>
            <div className="hero-text">
             <h1>Welcome to Book Trade</h1>
              <p>The best book exchange app</p>
            </div>
          </div>
        </div>
        <div className="container">
            <Carousel infiniteLoop={true}	showStatus={false}	showThumbs={false}>
                <div className="book-block">
			          	<BookList books={array.slice(0, 3)} editable={false}/>
                </div>
                <div className="book-block">
                  <BookList books={array.slice(3, 6)} editable={false}/>
                </div>
                <div className="book-block">
                  <BookList books={array.slice(6, 9)} editable={false}/>
                </div>
            </Carousel>
        </div>
      </div>
    );
  }
}