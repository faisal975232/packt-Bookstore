import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LoginAdmin } from "../Apis/AdminApis";
import { ToastSuccessNotifications,ToastErrorNotifications } from "../Notification/ToastNotifications";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Login = () => {
    let navigate = useNavigate();

  const SignInSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const submitLogin =async (values)=>{
   const returnData = await LoginAdmin(values);
   console.log(returnData)

   if (returnData.success == true) {
    ToastSuccessNotifications("Logging In");

    localStorage.setItem("user", JSON.stringify(returnData.authorisation.token));

    navigate("/home");
  } else if (returnData.success == false) {
    ToastErrorNotifications('Login Failed');
  }

  }

  return (
    <div>
      <div className="">
        <div className="card mt-5 " style={{ width: "500px", margin: "auto" }}>
          <div className="card-body">
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={SignInSchema}
              onSubmit={(values, { setSubmitting }) => {
                submitLogin(values)
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <Field className="form-control" name="email" />
                    <ErrorMessage className="mt-2" name="email">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Password</label>
                    <Field
                      type="password"
                      className="form-control"
                      name="password"
                    />
                    <ErrorMessage className="mt-2" name="password">
                      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
                    </ErrorMessage>
                  </div>

                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            
          </div>
        </div>
      </div>
      <div className="text-center mt-3">
      <Link to="/">Go to Books</Link>
      </div>
    </div>
  );
};

export default Login;
