import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  ToastSuccessNotifications,
  ToastErrorNotifications,
} from "../Notification/ToastNotifications";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AddBookRequest } from "../Apis/AdminApis";

const AddBook = (prop) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const SubmitBook=async (values)=>{
    let token = localStorage.getItem("user").replace(/^"(.*)"$/, "$1");
   const response = await AddBookRequest(token,values)
   if (response.status == 'Success') {
    ToastSuccessNotifications(response.message);
    setShow(false)
    prop.prop.func({limit:10,skip:0})
  } else  {
    ToastErrorNotifications('Failed ,Try again');
    setShow(false)
  }

  }
  return (
    <div>
      <button
        className="btn  btn-primary mx-2"
        onClick={() => {
          setShow(true);
        }}
      >
        Add Book
      </button>

      <Modal size="lg" show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              title: "",
              author: "",
              genre: "",
              isbn: "",
              description: "",
              image: "",
              publisher: "",
              published: "",
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
              SubmitBook(values);
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
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button type="submit">Add</Button>
                </Modal.Footer>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AddBook;
