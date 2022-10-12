import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { Link } from "react-router-dom";

import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import '../../style/Login.css'

import UserService from "../../services/user.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
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
    this.onChangeGenre = this.onChangeGenre.bind(this);
    
    this.state = {
      title: "",
      author: "",
      image: "",
      description: "",
      isbn: "",
      genre: "",
      successful: false,
      message: ""
    };
  }
  
  getImageFileObject(imageFile) {
    console.log({ imageFile })
  }
  
  runAfterImageDelete(file) {
    console.log({ file })
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

  onChangeGenre(e) {
    this.setState({
      genre: e.target.value
    });
  }

  handleAddBook(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      UserService.addBook(
        {
          title: this.state.title,
          author: this.state.author,
          description: this.state.description,
          genre: this.state.genre,
          isbn: this.state.isbn,
          image: this.state.image
        }
      ).then(
        response => {
          this.setState({
            message: "Thanks for adding " + this.state.title + " !",
            successful: true
          });
        },
        error => {
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
                  />
                </div>

                <div className="input-container">
                  <label htmlFor="genre">Genre</label>
                  <Input
                    type="text"
                    className="input-text description"
                    name="genre"
                    value={this.state.genre}
                    onChange={this.onChangeGenre}
                    validations={[required]}
                  />
                </div>
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