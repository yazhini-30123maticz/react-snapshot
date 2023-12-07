import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { isEmpty } from '../../config/common';
import { login, tokenupdate } from '../../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Login(props) {
 
  const history = useHistory();
  const initialValue = {
    "email": "",
    "password": ""
  }

  const [formValue, setFormValue] = useState(initialValue);
  const [validErrors, setValidErrors] = useState("");
  const [loc, setLoc] = useState("")


  const formvalidation = async (data) => {
    var validationErr = {};
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([A-Za-zA-Z\-0-9]+\.)+[A-Za-zA-Z]{2,}))$/;
    if (data.email == "") { validationErr.email = "Email cannot be empty" }
    else if (data.email != "") {
      if (!emailRegex.test(data.email)) { validationErr.email = "Enter valid email" }
    }

    if (!data.password) { validationErr.password = "password cannot be empty" }
    // console.log("validation object", validationErr)
    return validationErr;
  }




  const handleSubmit = async () => {

    var resp = await formvalidation(formValue);
    if (resp) setValidErrors(resp)
    if (!isEmpty(resp)) {
      // console.log("erore", isEmpty(resp))   // shiuld add toastr here

    }
    else {
      formValue.path = "login";
      var resp = await login(formValue)
      // console.log('resppppp', resp)
      if (resp.data) {

        localStorage.setItem("token",resp.token)
        localStorage.setItem("adminlogin", "yes")
        toast.success(resp.msg)
tokenupdate();
        history.push("/admin/dashboard");
      }
      else {
        toast.error(resp.msg)
      }


    }






  }


  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormValue((formValue) => ({ ...formValue, [name]: value }));


  }










  return (
    <div>
      <ToastContainer />
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div className="card text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                {/* <img src={require("../../assets/images/logo.png")} alt="logo" /> */}
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className="font-weight-light">Sign in to continue.</h6>
              <Form className="pt-3">
                <Form.Group className="d-flex search-field">
                  <Form.Control type="email" name="email" placeholder="Enter email" size="lg" className="h-auto" id="email" value={formValue.email} onChange={(e) => handlechange(e)} />
                </Form.Group>
                <p>{validErrors.email}</p>
                <Form.Group className="d-flex search-field">
                  <Form.Control type="password" name="password" placeholder="Password" size="lg" className="h-auto" id="password" value={formValue.password} onChange={(e) => handlechange(e)} />
                </Form.Group>
                <p>{validErrors.password}</p>
                <div className="mt-3">
                  <p className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" onClick={() => handleSubmit()}>SIGN IN</p>
                </div>

                {/* <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input"/>
                        <i className="input-helper"></i>
                        Keep me signed in
                      </label>
                    </div>
                    <a href="!#" onClick={event => event.preventDefault()} className="auth-link text-muted">Forgot password?</a>
                  </div>
                
                  <div className="text-center mt-4 font-weight-light">
                    Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
                  </div> */}
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

