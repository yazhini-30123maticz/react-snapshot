


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { editredirections } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';
import '../assets/styles/style.css'



export default function Editredirection(props) {
    
    const { state } = props;
    const[editredirection,setEditredirection]=useState({})
    const history = useHistory();
    const [errors, setError] = useState()
   

 
    const handlechange = (e) => {
        var { name, value } = e.target;
        setEditredirection((editredirection) => ({ ...editredirection, [name]: value }));
    }


     //form validation
     const validation = async () => {
        let errors = {};
        if (isEmpty(editredirection?.Oldurl)) {
            errors.Oldurl = "oldurl field is required";
        }
        if (isEmpty(editredirection?.Newurl)) {
            errors.Newurl = "newurl field is required";
        }
        return errors
     
    }

    useEffect(() => {
        listingfn(props);
    }, [props])

   
  

    const listingfn = async (props) => {
        setEditredirection({
            "_id": props.location.state._id,
            "Oldurl": props.location.state.Oldurl,
            "Newurl": props.location.state.Newurl,
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
                "_id": editredirection._id,
                "Oldurl": editredirection.Oldurl,
                "Newurl": editredirection.Newurl,
                "created_date": editredirection.created_date
            }

            var redirectionedit = await editredirections(data)
     
            if (redirectionedit.status==true) {
                toast.success(" Edited successfully ")
                setTimeout(() => {
                    history.push("/pages/redirection");
                  }, 2000)
            }
            else{
             toast.error(redirectionedit.message)
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
                                <h1>Edit Redirections</h1>
                                
                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Oldurl</label>
                                    <input type="text" name="Oldurl" class="form-control" id="Oldurl" placeholder="Oldurl"  value={editredirection.Oldurl} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="Oldurl-error" >{errors && errors.Oldurl}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Newurl</label>
                                    <input type="text" name="Newurl" class="form-control" id="Newurl" placeholder="Newurl" value={editredirection.Newurl} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="Newurl-error" >{errors && errors.Newurl}</span>
                                </div>

                              
                               
                                <button class="btn btn-primary" id="editredirect" name="editredirect" type="button" onClick={(event) => onSubmit(event)}>Save Changes</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


