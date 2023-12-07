


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { blogcategoryfind, editblog, listblog } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';



export default function Contactdetails(props) {


    const [contactdetails, setContactdetails] = useState({})
    const { state } = props;



    useEffect(() => {
        contactdetaillist(props);
    }, [props])

    const contactdetaillist = async (props) => {
        var data = {
            name: props.location.state.name,
            email: props.location.state.email,
            contact: props.location.state.contact,
            country: props.location.state.country,
            socialId: props.location.state.socialId,
            category: props.location.state.category,
            subcategory: props.location.state.subcategory,
            description: props.location.state.description,
            path: props.match.path,
            url: props.match.url,
            created_date: props.location.state.created_date
        }



        setContactdetails(data)


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
                                <h1>Contact Details</h1>
                                <div>
                                    <p>Name:{contactdetails?.name}</p>
                                    <p>Email:{contactdetails?.email}</p>
                                    <p>Contact:{contactdetails?.contact}</p>
                                    <p>Country:{contactdetails?.country}</p>
                                    <p>SocialId:{contactdetails?.socialId}</p>
                                    <p>category:{contactdetails?.category}</p>
                                    <p>subcategory:{contactdetails?.subcategory}</p>
                                    <p>Description:{contactdetails?.description}</p>
                                    <p>Path:{contactdetails?.path}</p>
                                    <p>Url:{contactdetails?.url}</p>
                                    <p>Date:{contactdetails?.created_date}</p>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}



