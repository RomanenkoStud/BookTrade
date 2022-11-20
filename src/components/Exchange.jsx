import React, {useState, useImperativeHandle, useRef, useEffect, forwardRef} from 'react';
import Modal from 'react-modal';

import BookService from "../services/book.service";
import ExchangeService from "../services/exchange.service";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import Select from "react-validation/build/select";
import BookModel from "../components/BookModel";
import { FaExchangeAlt } from 'react-icons/fa';
import { Link } from "react-router-dom";

import "../style/Login.css"

const genre = {
  'ACTION_AND_ADVENTURE': 'Action and adventure',
  'CLASSICS': 'Classics',
  'COMIC_BOOK': 'Comic book',
  'DETECTIVE_AND_MYSTERY': 'Detective and mystery',
  'FANTASY': 'Fantasy',
  'HISTORICAL_FICTION': 'Historical fiction',
  'HORROR': 'Horror',
  'LITERARY_FICTION': 'Literary fiction',
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '15px',
    overflow: "auto",
    maxHeight: "90vh"
  },
  overlay: {
    backgroundColor: 'rgba(29, 29, 42, 0.75)'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

const Exchange = forwardRef((props, ref) => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState({});
  const [selectedFull, setSelectedFull] = useState({});
  const [offer, setOffer] = useState({});
  const [booksAll, setBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  useImperativeHandle(ref, () => ({
    openModal: (book) => {
        setIsOpen(true);
        setSelected(book);
        setMessage("")
        setSuccessful(false)
    }
    }));

  useEffect(() => {
    if(props.user){
    BookService.getBooks(props.user.id, props.user.token).then(
      response => {
        setBooks(response.data);
        if (booksAll) {
          setOffer(booksAll[0])
        }
      },
      error => {
        setMessage(
            (error.response && error.response.data) ||
            error.message ||
            error.toString());
      }
    );
    BookService.getBookInfo(selected.id, props.user.token).then(
      response => {
        setSelectedFull(response.data);
      },
      error => {
        setSelectedFull(
            (error.response && error.response.data) ||
            error.message ||
            error.toString());
      }
    );
  }
  
  }, [props.user, selected]);

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setIsOpen(false);
    if (booksAll) {
      setOffer(booksAll[0])
    }
    document.body.style.overflow = "auto";
  }

  function handleLogin(e) {
    e.preventDefault();
    if (selectedFull.userDto.id == props.user.id) {
      setMessage("You own this book")
    }
    else {
      ExchangeService.addRequest(
        selectedFull.id, offer.id, 
        selectedFull.userDto.id, props.user.id, 
        props.user.token).then(
          response => {
            setMessage(response.data + "! ");
            setSuccessful(true)
          },
          error => {
            setMessage(error.response.data);
          }
        );
    }
}
  function onChangeOffer(e) {
    setOffer(booksAll[e.target.value])
  }

  const refForm = useRef(null);
  const refBtn = useRef(null);

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
      <Form
            onSubmit={handleLogin}
            ref={refForm}
          >
            {!successful && ( <div>
            {selected && offer &&
            <div style={{display: 'flex',alignItems: 'center',justifyContent: "center"}}>
            <BookModel cover={"data:image/png;base64," + selected.imageData} title={selected.title} 
                    author={selected.author} description={selected.description} form={true}/>
            <FaExchangeAlt style={{marginBottom: '30px', color: '#1D1D2A'}} className="exchange_i"/>
            <BookModel cover={"data:image/png;base64," + offer.imageData} title={offer.title} 
                    author={offer.author} description={offer.description} form={true}/>
            </div>}
            <div className="input-container" style={{fontWeight: "bold"}}>INFO</div>
            <div className="input-container">Title: {selectedFull?.title}</div>
            <div className="input-container">Author: {selectedFull?.author}</div>
            <div className="input-container">Description: {selectedFull?.description}</div>
            <div className="input-container">Genre: {" "} 
            {selectedFull?.genre?.map((data) => {
                return (
                    genre[data] + "; "
                );})}
            </div>
            <div className="input-container">Publisher: {selectedFull?.publisher}</div>
            <div className="input-container">Owner: {selectedFull?.userDto?.username}</div>
            <div className="input-container">
              <label htmlFor="offer" style={{fontWeight: "bold"}}>You offer</label>
              <Select
                type="text"
                className="input-text"
                name="offer"
                onChange={onChangeOffer}
                style={{ width: "100%" }}
               >
                
                {booksAll.map((data, key) => {
                    return (<option value={key}>{data.title}</option>)})}
               </Select>
            </div>

            <div className="button-container">
              <button className="input-button">
                <span>Submit</span>
              </button>
            </div>
            </div>)}
            {message && (
              <div className="input-container">
                <div className= {successful ? "alert alert-success" : "alert alert-danger"}
                role="alert" style={{width: "100%"}}>
                  {message}
                  {successful ? <Link to={"/history"} onClick={closeModal}> Go to History</Link> : null}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={refBtn}
            />
          </Form>
      </Modal>
    </div>
  );
});

export default Exchange;