import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteBook, allBooks } from "../Apis/AdminApis";
import {
  ToastSuccessNotifications,
  ToastErrorNotifications,
} from "../Notification/ToastNotifications";
import PaginationComponent from "../Component/Pagination";
import AddBook from "../Component/AddBook";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { fetchBook,EditBookRequest } from "../Apis/AdminApis";
import { Link } from "react-router-dom";

const AdminHome = () => {
  // deletemodal
  const [show, setShow] = useState(false);
  const [deleteId, setDeleteId] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setDeleteModal = (del) => {
    setDeleteId(del);
    setShow(true);
  };

  const [books, setBooks] = useState("");
  const [totalBooks, setTotalBooks] = useState("");
  const [showPerPage, setshowPerPage] = useState(10);
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: showPerPage,
  });

  const onPaginationChange = (start, end) => {
    setPagination({
      skip: start,
      limit: showPerPage,
    });
    getAllBooks({
      skip: start,
      limit: showPerPage,
    });
  };

  const getAllBooks = async (data) => {
    let token = localStorage.getItem("user").replace(/^"(.*)"$/, "$1");
    const response = await allBooks(token, data);
    setBooks(response.data);
    setTotalBooks(response.count);
  };

  const DeleteBookRequest = async (bookId) => {
    let token = localStorage.getItem("user").replace(/^"(.*)"$/, "$1");
    const returnData = await deleteBook(token, bookId);
    if ((returnData.status = "Success")) {
      ToastSuccessNotifications(returnData.message);
      getAllBooks(pagination);
    } else {
      ToastErrorNotifications(returnData.message);
    }
    setShow(false);
  };

  useEffect(() => {
    getAllBooks(pagination);
  }, []);

  // editmodal
  const [editshow, seteditshow] = useState(false);
  const [editId, seteditId] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const edithandleClose = () => seteditshow(false);
  const edithandleShow = () => seteditshow(true);

  const setEditModal = async (edit) => {
    seteditId(edit);
    let token = localStorage.getItem("user").replace(/^"(.*)"$/, "$1");
    const response = await fetchBook(token, edit);
    setEditBook(response.data);
    seteditshow(true);
  };

  const editSubmit = async (values)=>{
    let token = localStorage.getItem("user").replace(/^"(.*)"$/, "$1");
    const response = await EditBookRequest(token,values,editId);
    if(response.status === "Success"){
      ToastSuccessNotifications(response.message);
      getAllBooks(pagination);
    }else{
      ToastErrorNotifications('Edit Book Failed');
    }
    seteditshow(false);

  }

  return (
    <div>
      <h5 className="text-center text-primary my-3">Books</h5>
      <div className="d-flex justify-content-center mb-3">
        <AddBook prop={{ func: getAllBooks, pagination: pagination }} />
      </div>

      <div className="card" style={{ width: "90%", margin: "auto" }}>
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Isbn</th>
                <th>Published</th>
                <th>Publisher</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books !== "" ?
               ( books.map((item) => (
                  <tr key={item.id}>
                    <th>{item.id}</th>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>{item.genre}</td>
                    <td>{item.isbn}</td>
                    <td>{item.published}</td>
                    <td>{item.publisher}</td>

                    <td>
                      <button
                        className="btn btn-sm btn-success mx-2"
                        onClick={() => {
                          setEditModal(item.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-primary mx-2"
                        onClick={() => {
                          setDeleteModal(item.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>)
                )):
                
                   < tr className="placeholder-glow">
                   <th><span className="placeholder col-7"></span></th>
                   <td><span className="placeholder col-7"></span></td>
                   <td><span className="placeholder col-7"></span></td>
                   <td><span className="placeholder col-7"></span></td>
                   <td><span className="placeholder col-7"></span></td>
                   <td><span className="placeholder col-7"></span></td>
                   <td><span className="placeholder col-7"></span></td>
 
                   <td><span className="placeholder col-7"></span></td>
                 </tr>
                 }
            </tbody>
          </table>

          <PaginationComponent
            showperpage={showPerPage}
            pg={onPaginationChange}
            dataLength={totalBooks}
          />
        </div>
      </div>

<div className="text-center mt-5">
<Link to="/logout"><button className="btn btn-primary ">Logout</button></Link>
</div>
      

      {/* delete Modal */}
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you Sure ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              DeleteBookRequest(deleteId);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* editModal */}
      <Modal
        size="lg"
        show={editshow}
        onHide={edithandleClose}
        animation={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: editBook.title,
              author: editBook.author,
              genre: editBook.genre,
              isbn: editBook.isbn,
              description: editBook.description,
              image: editBook.image,
              publisher: editBook.publisher,
              published: editBook.published,
            }}
            validationSchema={Yup.object({
              title: Yup.string().required("Title is required"),
              author: Yup.string().required("Author is required"),
              genre: Yup.string().required("Genre is required"),
              isbn: Yup.string().required("ISBN is required"),
              description: Yup.string().required("Description is required"),
              image: Yup.string().required("Image is required"),
              publisher: Yup.string().required("Publisher is required"),
              published: Yup.date().required("Published date is required"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              editSubmit(values)
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="container">
                  <div className="row">
                    <div className="col-sm-6">
                      <div>
                        <label className="form-label">Title</label>
                        <Field
                          type="text"
                          className="form-control mb-2"
                          name="title"
                        />
                        <ErrorMessage name="title">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div>
                        <label className="form-label">Author</label>
                        <Field
                          type="text"
                          className="form-control mb-2"
                          name="author"
                        />
                        <ErrorMessage name="author">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div>
                        <label className="form-label">Genre</label>
                        <Field
                          type="text"
                          className="form-control mb-2"
                          name="genre"
                        />
                        <ErrorMessage name="genre">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <div>
                        <label className="form-label">Isbn</label>
                        <Field
                          type="text"
                          className="form-control mb-2"
                          name="isbn"
                        />
                        <ErrorMessage name="isbn">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="form-label">Description</label>
                  <Field
                    type="text"
                    as="textarea"
                    className="form-control mb-2"
                    name="description"
                  />
                  <ErrorMessage name="description">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div>
                  <label className="form-label">Image Link</label>
                  <Field
                    type="text"
                    className="form-control mb-2"
                    name="image"
                  />
                  <ErrorMessage name="image">
                    {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                  </ErrorMessage>
                </div>
                <div className="container">
                  <div className="row">
                    <div className="col-sm--6">
                      <div>
                        <label className="form-label">Publisher</label>
                        <Field
                          type="text "
                          className="form-control mb-2"
                          name="publisher"
                        />
                        <ErrorMessage name="publisher">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                    <div className="col-sm--6">
                      <div>
                        <label className="form-label">Published</label>
                        <Field
                          type="date"
                          className="form-control mb-2"
                          name="published"
                        />
                        <ErrorMessage name="published">
                          {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                        </ErrorMessage>
                      </div>
                    </div>
                  </div>
                </div>

                <Modal.Footer>
                  <Button variant="secondary" onClick={edithandleClose}>
                    Close
                  </Button>
                  <Button type="submit">Edit</Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminHome;
