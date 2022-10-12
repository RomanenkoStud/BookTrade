import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
//import UserService from "../../services/user.service";
import BookList from "../BookList";
import "../../style/Home.css"
import { stockData } from "../../data";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    /*UserService.getPublicContent().then(
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
    );*/
  }
  
  render() {
    var array = [];
    for(var key in stockData){
    if(!stockData.hasOwnProperty(key)){
        continue;
    }
    array.push(stockData[key])
    }

    return (
      <div>
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
			          	<BookList books={array.slice(0, 4)} editable={false}/>
                </div>
                <div className="book-block">
                  <BookList books={array.slice(4, 8)} editable={false}/>
                </div>
                <div className="book-block">
                  <BookList books={array.slice(8, 12)} editable={false}/>
                </div>
            </Carousel>
        </div>
      </div>
    );
  }
}