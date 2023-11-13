import React, { useState } from "react";
import booksData from "./BooksData";
import { Link } from "react-router-dom";

function ViewBooks() {

    const [books, setBooks] = useState(booksData);

    function deleteBook(id) {
        // setBooks((prev) =>[...prev].filter(x => x.id !== id));
        let idx = booksData.indexOf(booksData.filter(x => x.id === id));
        booksData.splice(idx, 1);
        setBooks([...booksData]);
    }

    return (
        <div className="container">
            <div className="text">
                View Books
            </div>
            {/* {
        booksData.map((book,index) => <option  key= {index} value={book.bookName}>{book.bookName}</option>)
        }  */}

            {books?.length > 0 ? <section>
                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Book Name</th>
                            <th>Topic</th>
                            <th>Pages</th>
                            <th>Writer</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            books.map((book, index) =>
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.bookName}</td>
                                    <td>{book.topic}</td>
                                    <td>{book.pages}</td>
                                    <td>{book.writer}</td>
                                    <td>{book.description}</td>
                                    <td><div className="table__button-group">

                                        <Link to={`/addBook/view/${book.id}`}>
                                            <button id='view'>View</button>
                                        </Link>

                                        <Link to={`/addBook/edit/${book.id}`}>
                                            <button id='edit'>Edit</button>
                                        </Link>

                                        <button id='delete' onClick={() => {
                                            if (window.confirm("Are you sure want to delete ?")) {
                                                deleteBook(book.id);
                                            }
                                        }} >Delete</button></div></td>

                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </section>
                : <h3 style={{ textAlign: 'center', lineHeight: 10 }}>No books available.</h3>}
        </div>
    );
}

export default ViewBooks;