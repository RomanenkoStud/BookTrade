import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { MultiSelect } from "react-multi-select-component";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import '../../style/Login.css'

import BookService from "../../services/book.service";

const genreOptions = [
    { value: 'ACTION_AND_ADVENTURE', label: 'Action and adventure' },
    { value: 'CLASSICS', label: 'Classics' },
    { value: 'COMIC_BOOK', label: 'Comic book' },
    { value: 'DETECTIVE_AND_MYSTERY', label: 'Detective and mystery' },
    { value: 'FANTASY', label: 'Fantasy' },
    { value: 'HISTORICAL_FICTION', label: 'Historical fiction' },
    { value: 'HORROR', label: 'Horror' },
    { value: 'LITERARY_FICTION', label: 'Literary fiction' },
  ]
  
const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const visbn = value => {
  if (value.length < 10 || value.length > 15) {
    return (
      <div className="alert alert-danger" role="alert">
        The ISBN must be between 10 and 15 characters.
      </div>
    );
  }
};

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.handleAddBook = this.handleAddBook.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeISBN = this.onChangeISBN.bind(this);
    this.onChangePublisher = this.onChangePublisher.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);

    this.state = {
      title: "",
      author: "",
      image: false,
      description: "",
      isbn: "",
      genre: [],
      successful: false,
      message: "",
      publisher: ""
    };
  }
  
  getImageFileObject(imageFile) {
    let file = imageFile.file
    this.setState({
      image: file
    });
  }
  
  runAfterImageDelete(file) {
    this.setState({
      image: false
    });
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeAuthor(e) {
    this.setState({
      author: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onChangeISBN(e) {
    this.setState({
      isbn: e.target.value
    });
  }

  onChangePublisher(e) {
    this.setState({
      publisher: e.target.value
    });
  }

  onChangeGenre(value) {
    this.setState({
      genre: value
    })
  }

  handleAddBook(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (!this.state.image) {
      let response = async () => await fetch('/images/default.jpg');
      let data = async () => await response.blob();
      let metadata = {
        type: 'image/jpeg'
      };
      const file = new File([data], "default.jpg", metadata);
      this.setState({
        image: file
      });
    }

    const book = {
      "title": this.state.title, "author": this.state.author, "description": this.state.description, 
      "genre": this.state.genre, "isbn": this.state.isbn, "publisher": this.state.publisher
    }

    if (this.checkBtn.context._errors.length === 0) {
      BookService.addBook(
        new Blob([ JSON.stringify(book)], { type: "application/json",}),
        new Blob([this.state.image], { type: "multipart/form-data",})
      ).then(
        response => {
          this.setState({
            message: "Book " + this.state.title + " added ! ",
            successful: true
          });
        },
        error => {
          console.log(error.response)
          this.setState({
            successful: false,
            message: error.response.data
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="app">
        <div className="login-form">
          <div className="title">Add Book</div>
          <Form
            onSubmit={this.handleAddBook}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
              <div className="wide-form">
                <div className="fields">
                <div className="input-container">
                  <label htmlFor="Title">Title</label>
                  <Input
                    type="text"
                    className="input-text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    validations={[required]}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="author">Author</label>
                  <Input
                    type="text"
                    className="input-text"
                    name="author"
                    value={this.state.author}
                    onChange={this.onChangeAuthor}
                    validations={[required]}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="description">Description</label>
                  <Input
                    type="text"
                    className="input-text description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="isbn">ISBN</label>
                  <Input
                    type="text"
                    className="input-text description"
                    name="ISBN"
                    value={this.state.isbn}
                    onChange={this.onChangeISBN}
                    validations={[required, visbn]}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="isbn">Publisher</label>
                  <Input
                    type="text"
                    className="input-text description"
                    name="publisher"
                    value={this.state.publisher}
                    onChange={this.onChangePublisher}
                    validations={[required]}
                  />
                </div>
                
                </div>
                <div className="fields">
                
                <div className="input-container">
                  <label htmlFor="genre">Genre</label>
                  <MultiSelect
                    name="genre"
                    className="input-text"
                    options={genreOptions}
                    value={this.state.genre}
                    onChange={this.onChangeGenre}
                    disableSearch={true}
                    hasSelectAll={false}
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="image">Cover</label>
                  <div className="book-img-card">
                    <ImageUploader
                      onFileAdded={(img) => this.getImageFileObject(img)}
                      onFileRemoved={(img) => this.runAfterImageDelete(img)}
                    />
                  </div>
                </div>

                </div>
                </div>
                <div className="button-container">
                  <button className="input-button">Submit</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                  {this.state.successful ? <Link to={"/collection"} >My Collection</Link> : {}}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}