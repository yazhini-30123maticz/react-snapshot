


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { sitemapedit } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
import '../assets/styles/style.css'



export default function Editsitemap(props) {
    const[editsitemap,setEditsitemap]=useState({})
    const history = useHistory();
    const [errors, setError] = useState()
   
    
    const { state } = props;
 
    const handlechange = (e) => {
        var { name, value } = e.target;
        setEditsitemap((editsitemap) => ({ ...editsitemap, [name]: value }));
    }


     //form validation
     const validation = async () => {
        let errors = {};
        var priorityreg= /^\d*\.?\d*$/
        if (isEmpty(editsitemap?.location)) {
            errors.location = "location field is required";
        }
        if (isEmpty(editsitemap?.priority)) {
            errors.priority = "priority field is required";
        }else if(!priorityreg.test(editsitemap?.priority)){
            errors.priority = "priority field is must be decimal";
        }
        if (isEmpty(editsitemap?.changefrequency)) {
            errors.changefrequency = "change frequency field is required";
        }
        
        return errors
    }

    useEffect(() => {
        listingfn(props);
    }, [props])

   
  

    const listingfn = async (props) => {
        setEditsitemap({
            "_id": props.location.state._id,
            "location": props.location.state.location,
            "priority": props.location.state.priority,
            "changefrequency": props.location.state.changefrequency,
            "created_date": props.location.state.created_date,
        })

    }




 


    const onSubmit = async (event) => {
        var value = await validation();
        if (!isEmpty(value)) {
            setError(value)
        }
        else {

            var data = {
                "_id": editsitemap._id,
                "location": editsitemap.location,
                "priority": editsitemap.priority,
                "changefrequency": editsitemap.changefrequency,
                "created_date": editsitemap.created_date
            }

            var Editsitemap = await sitemapedit(data)
     
            if (Editsitemap.status==true) {
                toast.success(" Edited successfully ")
                setTimeout(() => {
                    history.push("/pages/sitemap");
                  }, 2000)
            }
            else{
             toast.error("Location is alreday defined")
            }


        }
    };








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
                                <h1>Edit Site Map</h1>
                                

                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Location</label>
                                    <input type="text" name="location" class="form-control" id="location"  value={editsitemap.location} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="location-error" >{errors && errors.location}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Priority</label>
                                    <input type="text" name="priority" class="form-control" id="priority" placeholder="priority" value={editsitemap.priority} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="priority-error" >{errors && errors.priority}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egmetatitle">Change Frequency</label>
                                    <input type="text" name="changefrequency" class="form-control" id="changefrequency" placeholder="Meta Title" value={editsitemap.changefrequency} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="changefrequency-error" >{errors && errors.changefrequency}</span>
                                </div>

                               
                                <button class="btn btn-primary" id="editsitemap" name="editsitemap" type="button" onClick={(event) => onSubmit(event)}>Edit Changes</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


