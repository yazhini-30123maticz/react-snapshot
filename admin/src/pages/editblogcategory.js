


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { editblogcategory } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';

import '../assets/styles/style.css'

export default function Editblogcategory(props) {
    const [formValue, setFormValue] = useState({})
    const [errors, setError] = useState()
    const history = useHistory();
    const { state } = props;
    const handlechange = (e) => {
        var { name, value } = e.target;
        setFormValue((formValue) => ({ ...formValue, [name]: value }));
    }

    const validation = async () => {
        let errors = {};
        if (isEmpty(formValue?.categoryname)) {
            errors.categoryname = "category field is required";
        }
        if (isEmpty(formValue?.slug)) {
            errors.slug = "slug field is required";
        }
        if (isEmpty(formValue?.metatitle)) {
            errors.metatitle = "metatitle field is required";
        }
        if (isEmpty(formValue?.metadescription)) {
            errors.metadescription = "metadescription field is required";
        }
        return errors
    }

    useEffect(() => {

        listingfn(props);
    }, [props])


    const listingfn = async (props) => {

        setFormValue({
            "_id": props.location.state._id,
            "categoryname": props.location.state.category_name,
            "slug": props.location.state.slug,
            "metatitle": props.location.state.meta_title,
            "metadescription": props.location.state.meta_description,
            "created_date": props.location.state.created_date
        })

    }

    const onSubmit = async (event) => {
        var value = await validation();
        if (!isEmpty(value)) {
            setError(value)
        }
        else {
            var data = {
                "_id": formValue._id,
                "categoryname": formValue.categoryname,
                "slug": formValue.slug,
                "metatitle": formValue.metatitle,
                "metadescription": formValue.metadescription
            }
          
            var Editblogcat = await editblogcategory(data)
     
            if (Editblogcat.status==true) {
                toast.success(" Edited successfully ")
                setTimeout(() => {
                      history.push("/pages/blogcategory"); 
                  }, 2000)
               
            }
            else{
                toast.error(Editblogcat.message)
            }

        }
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
                                <h1>Add Blog Category</h1>





                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Category name</label>
                                    <input type="text" name="categoryname" class="form-control" id="categoryname" placeholder="Category name" value={formValue.categoryname} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="categoryname-error" >{errors && errors.categoryname}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Slug</label>
                                    <input type="text" name="slug" class="form-control" id="slug" placeholder="Slug" value={formValue.slug} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="slug-error" >{errors && errors.slug}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egmetatitle">Meta Title</label>
                                    <input type="text" name="metatitle" class="form-control" id="metatitle" placeholder="Meta Title" value={formValue.metatitle} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="metatitle-error" >{errors && errors.metatitle}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egmetadescription">Meta Description</label>
                                    <input type="text" name="metadescription" class="form-control" id="metadescription" placeholder="Meta Description" value={formValue.metadescription} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="metadescription-error" >{errors && errors.metadescription}</span>
                                </div>

                                <button class="btn btn-primary" id="addcatSubmit" name="addcatSubmit" type="button" onClick={(event) => onSubmit(event)}>Save Changes</button>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


