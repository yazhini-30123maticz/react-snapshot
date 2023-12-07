import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { editmetachild } from '../api/api';
import { isEmpty } from '../config/common'
import ReactDatatable from '@ashvin27/react-datatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';



export default function Editmetachild(props) {
    const history = useHistory();
    const { state } = props;
    const [formValue, setFormValue] = useState({_id:props.location.state._id})
    const [files, setFiles] = useState("")
    const [errors, setError] = useState()
  
    const handlechange = (e) => {
        setError({})
        var { name, value } = e.target;
        setFormValue((formValue) => ({ ...formValue, [name]: value }));
    }

 
    const validation = async () => {
        let errors = {};
        if (isEmpty(formValue?.tagname)) {
            errors.tagname = "Tag Name field is required";
        }
        if (isEmpty(formValue?.tagcontent)) {
            errors.tagcontent = "Tag Content field is required";
        }

        return errors
    }




    useEffect(() => {

        listingfn(props);
    }, [props])


     const listingfn = async (props) => {
      

        setFormValue({
            "_id": props.location.state._id,
            "tagtype": props.location.state.tagtype,
            "tagname": props.location.state.tagname,
            "tagcontent": props.location.state.tagcontent
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
                "tagname": formValue.tagname,
                "tagcontent": formValue.tagcontent
              
            }

            var edit = await editmetachild(data)
           
            if (edit.status==true) {
                toast.success(" Edited successfully ")
                setTimeout(() => {
                      history.push("/pages/metachild",  {_id:props.location.state.metatagid}); 
                  }, 2000)
               
            }

        }



    }


    return (
        <>
            <ToastContainer />
            <div>
                <h1>Edit  Meta Tags Child</h1>

                <div class="form-group">
                    <label for="exampletagtype">Tag Type</label>
                    <select id="tagtype" name="tagtype"  class="form-control" value={formValue.tagtype} onChange={(e) => handlechange(e)}>
                        <option value="">Choose One</option>
                        <option value="name" selected={formValue=="name" ? true : false}>name</option>
                        <option value="property"  selected={formValue=="property" ? true : false}>property</option>
                    </select>
                    <span class="tagtype-error" ></span>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="egtagname">Tag Name</label>
                    <input type="text" name="tagname" class="form-control" id="tagname" placeholder="url" value={formValue.tagname} onChange={(e) => handlechange(e)} />
                    <span className="errors_style" id="tagname-error" >{errors && errors.tagname}</span>
                </div>


                <div class="col-md-12 mb-3">
                    <label for="egtagcontent">Tag Content</label>
                    <input type="text" name="tagcontent" class="form-control" id="tagcontent" placeholder="Meta Title" value={formValue.tagcontent} onChange={(e) => handlechange(e)} />
                    <span className="errors_style" id="tagcontent-error" >{errors && errors.tagcontent}</span>
                </div>

                <button class="btn btn-primary" id="edit" name="edit" type="button" onClick={(event) => onSubmit(event)}>Save</button>

            </div>
        </>
    )

}


