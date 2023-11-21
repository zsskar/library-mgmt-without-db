import React, { useEffect, useState } from "react";
import '../css/Book.css';
import booksData from "./BooksData";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { useLocation, useNavigate, useParams } from "react-router-dom";

function AddBook() {

   const location = useLocation();
   const navigate = useNavigate();


   const initialValues =
   {
      id: booksData.length + 1,
      bookName: "",
      topic: "",
      pages: "",
      writer: "",
      description: ""
   };

   const [books, setBooks] = useState(initialValues);
   const params = useParams();

   const clearState = () => {
      setBooks({ ...initialValues });
   };

   useEffect(() => {
      clearState();
   }, [location]);

   useEffect(() => {
      if (Object.keys(params).length !== 0) {
         const id = parseInt(params.id);
         if (booksData.findIndex(obj => obj.id === id) !== -1) {
            let singleBook = booksData.filter(obj => obj.id === id)[0];
            setBooks({ ...singleBook });
         } else {
            navigate("/addBook");
         }
      }
   },[params]);



   function addBook() {
      return new Promise(resolve => {
         booksData.push(books);
         setTimeout(resolve, 1);
      });
   }

   function handleInput(event) {
      const { name, value } = event.target;
      setBooks({ ...books, [name]: value });

   }

   function submit(e) {
      e.preventDefault();
      console.log(params.action);
      if (params.action === undefined) {
         addBook().then(clearState);
         NotificationManager.success('Success', 'Book Saved.');
      }
      else {
         if (params.action === 'edit') {
            const id = parseInt(params.id);
            const index = booksData.findIndex(obj => obj.id === id);
            booksData[index] = books;
            NotificationManager.success('Success', 'Book Updated.');
         }
      }

   }
   return (
      <div className="container">
         <NotificationContainer />
         <div className="text">
            {params.action === undefined ? <h4>Add Book</h4> : params.action === 'edit' ? <h4>Edit Book</h4> : <h4>View Book</h4>}
         </div>
         <form onSubmit={(e) => submit(e)} >
            <div className="form-row" >
               <div className="input-data">
                  <input name="bookName" type="text" required onChange={handleInput}
                     value={books?.bookName} onInvalid={F => F.target.setCustomValidity('enter name here')}
                     onInput={F => F.target.setCustomValidity('')} />
                  <div className="underline"></div>
                  <label htmlFor="bookName">Book Name</label>
               </div>
               <div className="input-data">
                  <input name="topic" type="text" required onChange={handleInput} value={books?.topic}
                     onInvalid={F => F.target.setCustomValidity('enter topic here')}
                     onInput={F => F.target.setCustomValidity('')}
                  />
                  <div className="underline"></div>
                  <label >Topic</label>
               </div>
            </div>
            <div className="form-row">
               <div className="input-data">
                  <input name="pages" type="text" required onChange={handleInput} value={books?.pages}
                     onInvalid={F => F.target.setCustomValidity('enter pages here')}
                     onInput={F => F.target.setCustomValidity('')}
                  />
                  <div className="underline"></div>
                  <label >Pages</label>
               </div>
               <div className="input-data">
                  <input name="writer" type="text" required onChange={handleInput} value={books?.writer}
                     onInvalid={F => F.target.setCustomValidity('enter writer here')}
                     onInput={F => F.target.setCustomValidity('')}
                  />
                  <div className="underline"></div>
                  <label >Writer</label>
               </div>
            </div>
            <div className="form-row">
               <div className="input-data textarea">
                  <textarea name="description" rows="8" cols="80" required onChange={handleInput} value={books?.description}
                     onInvalid={F => F.target.setCustomValidity('enter description here')}
                     onInput={F => F.target.setCustomValidity('')}
                  />
                  <br />
                  <div className="underline"></div>
                  <label>Description</label>
                  <br />
                  <div style={{ display: params.action === undefined ? 'block' : 'none' }} className="form-row submit-btn">
                     <div className="input-data" style={{ float: 'right' }}>
                        <div className="inner"></div>
                        <input type="submit" value="Add" />
                     </div>
                  </div>

                  <div style={{ display: params.action === 'edit' ? 'block' : 'none' }} className="form-row submit-btn">
                     <div className="input-data" style={{ float: 'right' }}>
                        <div className="inner"></div>
                        <input type="submit" value="Edit" />
                     </div>
                  </div>
               </div>
            </div>
         </form>
      </div>

   );
}

export default AddBook;