import React, { useEffect, useState } from "react";
import '../css/Book.css';
import booksData from "./BooksData";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { useParams } from "react-router-dom";

function AddBook()
{
   // let singleBook = [];
   const initialValues ={
      id : "",
      bookName : "",
      topic : "",
      pages : "",
      writer : "",
      description : ""
   };
   // console.log(singleBook.length);
   const [books,setBooks] = useState(initialValues);
   const params = useParams();
 
   // console.log("Before Setting...",books);
   useEffect(() => {
      if(Object.keys(params).length !== 0){
         // console.log(params);
         const id = parseInt(params.id);
          let singleBook = booksData.filter(obj => obj.id === id)[0];
         //   console.log("Single",singleBook);
         setBooks(singleBook);
      }
  },[]);
   
//   console.log("After Setting...",books);
   

   const clearState = () => {
      setBooks(initialValues);
    };

    function addBook() {
      return new Promise(resolve => {
        booksData.push(books);
        setTimeout(resolve, 1);
      });
    }

   function handleInput(event){
      const {name,value} = event.target;
      setBooks({...books,[name]: value,id : booksData.length + 1 });
   }

   function submit(e){
      e.preventDefault();
      addBook().then(clearState);
      console.log(booksData);
      NotificationManager.success('Success', 'Book Saved.');
   }

    return (
        <div className="container">
        <NotificationContainer/>
        <div className="text">
           Add Book
        </div>
        <form onSubmit={(e)=> submit(e)} >
           <div className="form-row">
              <div className="input-data">
                 <input disabled={params.id ? true : false} name="bookName" type="text" required onChange={handleInput}
                  value={books?.bookName} onInvalid={F => F.target.setCustomValidity('enter name here')} 
                  onInput={F => F.target.setCustomValidity('')}  />
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
              <div style={{display : params.id ? 'none' : 'block'}} className="form-row submit-btn">
                 <div className="input-data" style={{float:'right'}}>
                    <div className="inner"></div>
                    <input type="submit" value="submit" />
                    {/* <input type="submit" value="submit" /> */}
                 </div>
              </div>
              </div>
        </div>
        </form>
        </div>
        
    );
}

export default AddBook;