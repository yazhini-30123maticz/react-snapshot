


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import {addsitemaps } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
import '../assets/styles/style.css'


export default function Addsitemap() {
    const [addsitemap, setaddsitemap] = useState({"location":config.FRONT_URL})
    const [errors, setError] = useState()
    const history = useHistory();
    const handlechange = (e) => {
        var { name, value } = e.target;
        setaddsitemap((addsitemap) => ({ ...addsitemap, [name]: value }));
    }

    const validation = async () => {
        let errors = {};
        var priorityreg= /^\d*\.?\d*$/
        if (isEmpty(addsitemap?.location)) {
            errors.location = "location field is required";
        }
        if (isEmpty(addsitemap?.priority)) {
            errors.priority = "priority field is required";
        }else if(!priorityreg.test(addsitemap?.priority)){
            errors.priority = "priority field is must be decimal";
        }
        if (isEmpty(addsitemap?.changefrequency)) {
            errors.changefrequency = "change frequency field is required";
        }
        
        return errors
    }

    


    const onSubmit = async (event) => {
        var value = await validation();
        if (!isEmpty(value)) {
            setError(value)
        }
        else {
            var sitemapadd = await addsitemaps(addsitemap)
            if(sitemapadd.status==true){
                toast.success("  successfully  Added")
                setTimeout(() => {
                    history.push("/pages/sitemap");
                  }, 1000)
            }
            else{
                toast.error("Location is already defined")
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
                                <h1>Add Site Map</h1>
                               </div>

                      


                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Location</label>
                                    <input type="text" name="location" class="form-control" id="location"  value={addsitemap.location} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="location-error" >{errors && errors.location}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Priority</label>
                                    <input type="text" name="priority" class="form-control" id="priority" placeholder="priority" value={addsitemap.priority} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="priority-error" >{errors && errors.priority}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egmetatitle">Change Frequency</label>
                                    <input type="text" name="changefrequency" class="form-control" id="changefrequency" placeholder="Meta Title" value={addsitemap.changefrequency} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="changefrequency-error" >{errors && errors.changefrequency}</span>
                                </div>
                                <div class="col-md-12 mb-3">
                               
                                <button class="btn btn-primary" id="addsitemap" name="addsitemap" type="button" onClick={(event) => onSubmit(event)}>Save Changes</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}   


