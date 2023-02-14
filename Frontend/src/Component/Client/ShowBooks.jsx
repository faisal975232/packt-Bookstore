import React, { useState, useEffect } from "react";
import { fetchallBooks, getGenres } from "../../Apis/ClientApis";
import PaginationComponent from "./Pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ShowBooks = () => {
  let navigate = useNavigate();

  const [Books, setBooks] = useState("");
  const [totalBooks, setTotalBooks] = useState("");
  const [genres, setGenres] = useState("");
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  const [showPerPage, setshowPerPage] = useState(12);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: showPerPage,
  });

  const fetch = async (pagination, keyword,genrekey,fromdatekey,todatekey) => {
    const response = await fetchallBooks(pagination, keyword,genrekey,fromdatekey,todatekey);
    setBooks(response.data);
    setTotalBooks(response.count);
    const fetchgenre = await getGenres();
    setGenres(fetchgenre.data);
    console.log(response);
  };

  const onPaginationChange = (start, end) => {
    setPagination({
      skip: start,
      limit: showPerPage,
    });
    fetch({
      skip: start,
      limit: showPerPage,
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const onSubmit = () => {
   
    fetch(pagination, search,genre,fromdate,todate);
  };

  const searchBook = (e) => {
    setSearch(e.target.value);
  };

  const searchGenre = (e) => {
    setGenre(e.target.value);
  };

  const searchFromDate = (e) => {
    setfromdate(e.target.value);
  };

  const searchtodate = (e) => {
    settodate(e.target.value);
  };

  const onBookClick = (id) => {
    localStorage.setItem("bookid", id);
    navigate("/bookinfo");
  };
  return (
    <div>
      <div className="text-end">
      <Link to="/login">Login</Link>
      </div>
      <div className="container mt-3">
        <div className="row">
          <div className="col-3">
          <label htmlFor="">Search Books</label>
            <input
              type="text"
              className="form-control "
              onChange={(e) => {
                searchBook(e);
              }}
            />
            <p> (Title,Author,Publisher,Description,Isbn)</p>
          </div>
          <div className="col-3">
            <label htmlFor="">Genre</label>
            <select name="" onChange={(e)=>{searchGenre(e)}} className="form-control" id="">
              <option  value="">Select Genre</option>
              {genres !== "" &&
                genres.map((item) => (
                  <option key={item.genre} value={item.genre}>{item.genre}</option>
                ))}
            </select>
          </div>

          <div className="col-2">
          <label htmlFor="">From Date</label>
            <input type="date" onChange={(e)=>{searchFromDate(e)}} className="form-control"  />
          </div>
          <div className="col-2">
          <label htmlFor="">To Date</label>
            <input type="date"  onChange={(e)=>{searchtodate(e)}} className="form-control"  />
          </div>
          <div className="col-2 mt-4">
            <button onClick={(e)=>{onSubmit()}} className="btn btn-primary">Search</button>
          </div>
        </div>
        <div className="text-center my-3">
          <span className="badge rounded-pill bg-light text-dark">
            Total Books:{totalBooks}
          </span>
        </div>
        <div className="row ">
          {Books !== "" &&
            Books.map((item) => (
              <div
                className="col-sm-2 mb-3"
                key={item.id}
                onClick={() => {
                  onBookClick(item.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card">
                  <div className="card-body">
                    <div className="text-center mb-1">
                      <span className="badge rounded-pill bg-info text-dark">
                        {item.genre}
                      </span>
                    </div>

                    <img
                      src={item.image}
                      className="img-thumbnail"
                      alt="Loading"
                      height="300"
                      width="200"
                    />
                    <h6 className="text-center text-uppercase">{item.title}</h6>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <PaginationComponent
        showperpage={showPerPage}
        pg={onPaginationChange}
        dataLength={totalBooks}
      />
    </div>
  );
};

export default ShowBooks;
