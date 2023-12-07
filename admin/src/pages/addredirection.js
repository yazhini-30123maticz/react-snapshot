


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import {addredirection } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
import '../assets/styles/style.css'


export default function Addredirection() {
    const [addredirect, setAddredirect] = useState({})
    const [errors, setError] = useState()
    const history = useHistory();
    const handlechange = (e) => {
        var { name, value } = e.target;
        setAddredirect((addredirect) => ({ ...addredirect, [name]: value }));
    }

    const validation = async () => {
        let errors = {};
        if (isEmpty(addredirect?.Oldurl)) {
            errors.Oldurl = "oldurl field is required";
        }
        if (isEmpty(addredirect?.Newurl)) {
            errors.Newurl = "newurl field is required";
        }
        return errors
    }

    


    const onSubmit = async (event) => {
        
        var value = await validation();
     
        if (!isEmpty(value)) {
            setError(value)
        }
        else {
            var redirectadd = await addredirection(addredirect)
            if(redirectadd.status==true){
                toast.success("  successfully  Added")
                setTimeout(() => {
                    history.push("/pages/redirection");
                  }, 1000)
            }
            else{
                toast.error(redirectadd.message)
            }
            }
        }

    return (
        <>
        <ToastContainer/>
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-12 mx-auto">
                            <div className="card text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                </div>
                                <div class="col-md-12 mb-3">
                                <h1>Add Redirection</h1>
                               
                                </div>
                      


                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Oldurl</label>
                                    <input type="text" name="Oldurl" class="form-control" id="Oldurl" placeholder="Oldurl"  value={addredirect.Oldurl} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="Oldurl-error" >{errors && errors.Oldurl}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Newurl</label>
                                    <input type="text" name="Newurl" class="form-control" id="Newurl" placeholder="Newurl" value={addredirect.Newurl} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="Newurl-error" >{errors && errors.Newurl}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                               
                                <button class="btn btn-primary" id="addredirect" name="addredirect" type="button" onClick={(event) => onSubmit(event)}>Save Changes</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}   


