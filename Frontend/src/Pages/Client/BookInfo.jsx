import React, { useState, useEffect } from "react";
import { fetchBook } from "../../Apis/ClientApis";
import { Link } from "react-router-dom";

const BookInfo = () => {
  const [bookId, setBookId] = useState(localStorage.getItem("bookid"));
  const [bookInfo, setbookInfo] = useState("");
  console.log(localStorage.getItem("bookid"));

  const getBookInfo = async (id) => {
    const response = await fetchBook(id);
    console.log(response);
    setbookInfo(response.data);
  };

  useEffect(() => {
    getBookInfo(bookId)
  }, []);

  return (
    <div>
      
      <div className="container mt-5">
      {bookInfo !='' ?(<div className="row">
           
           <div className="col-sm-5">
             <img
               src={bookInfo.image}
               className="rounded "
               width="500"
               height="700"
               alt="Loading"
             />
           </div>
           <div className="col-sm-7">
             <div className="card">
               <div className="card-body">
                 <h5>Title</h5>
                 <h6>{bookInfo.title}</h6>
                 <h5 className="mt-4">Author</h5>
                 <h6>{bookInfo.author}</h6>
                 <h5 className="mt-4">Genre</h5>
                 <h6>{bookInfo.genre}</h6>
                 <h5 className="mt-4">Description</h5>
                 <h6>{bookInfo.description}</h6>
                 <h5 className="mt-4">Isbn</h5>
                 <h6>{bookInfo.isbn}</h6>
                 <h5 className="mt-4">Published</h5>
                 <h6>{bookInfo.published}</h6>
                 <h5 className="mt-4">Publisher</h5>
                 <h6>{bookInfo.publisher}</h6>
               </div>
             </div>
           </div>
         </div>) :
         <div className="row">
           
         <div className="col-sm-5">
           <div className="placeholder-glow">
           <div className="placeholder col-10" style={{height:'600px'}}></div>
           </div>
           </div>
         <div className="col-sm-7">
           <div className="card">
             <div className="card-body">
             <div className="placeholder-glow">
               <h5>Title</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Author</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Genre</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Description</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Isbn</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Published</h5>
               <span className="placeholder col-7"></span>
               <h5 className="mt-4">Publisher</h5>
               <span className="placeholder col-7"></span>
               </div>
             </div>
           </div>
         </div>
      
       </div>
       }
       <div className="text-center">
       <Link to="/"><button className="btn btn-primary my-2">Back</button></Link>
       </div>
       
      </div>
      </div>
   
  );
};

export default BookInfo;
