


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { blogcategoryfind, editblog, listblog } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';



export default function Requestdetails(props) {


    const [requestdetails, setRequestdetails] = useState({})
    const { state } = props;



    useEffect(() => {
        requestdetaillist(props);
    }, [props])

    const requestdetaillist = async (props) => {
        
        var data = {
            name: props.location.state.name,
            email: props.location.state.email,
            contact: props.location.state.contact,
            country: props.location.state.country,
            file: props.location.state.file,
            category: props.location.state.category,
            subcategory: props.location.state.subcategory,
            requirement: props.location.state.requirement,
            path: props.match.path,
            url: props.match.url,
            created_date: props.location.state.created_date
        }



        setRequestdetails(data)


    }










    return (
        <>
            <ToastContainer />
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-12 mx-auto">
                            <div className="card text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                </div>
                                <h1>Request Form  Details</h1>
                                <div>
                                    <p>Name:{requestdetails?.name}</p>
                                    <p>Email:{requestdetails?.email}</p>
                                    <p>Contact:{requestdetails?.contact}</p>
                                    <p>Country:{requestdetails?.country}</p>
                                    <p>File:{requestdetails?.file}</p>
                                    <p>category:{requestdetails?.category}</p>
                                    <p>subcategory:{requestdetails?.subcategory}</p>
                                    <p>Requirement:{requestdetails?.requirement}</p>
                                    <p>Path:{requestdetails?.path}</p>
                                    <p>Url:{requestdetails?.url}</p>
                                    <p>Date:{requestdetails?.created_date}</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}



