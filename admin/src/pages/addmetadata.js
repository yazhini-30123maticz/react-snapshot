import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { addmetadata } from '../api/api';
import { isEmpty } from '../config/common'
import ReactDatatable from '@ashvin27/react-datatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';



export default function Addmetadata() {
    const history = useHistory();
    const [formValue, setFormValue] = useState({faqSchema:"",faqJson:""})
    const [files, setFiles] = useState("")
    const [errors, setError] = useState()
    const handlechange = (e) => {
        setError({})
        var { name, value } = e.target;
        setFormValue((formValue) => ({ ...formValue, [name]: value }));
    }

    const onChangeValue = async (e) => {
        setError({})
        var { id, value, files } = e.target
        setFiles(files[0])
    }


    const validation = async () => {
        let errors = {};
        if (isEmpty(formValue?.page)) {
            errors.page = "page field is required";
        }
        if (isEmpty(formValue?.metatitle)) {
            errors.metatitle = "metatitle field is required";
        }
        if (isEmpty(formValue?.metadescription)) {
            errors.metadescription = "metadescription field is required";
        }
        if (files == {} || files == "") {
            errors.ogimage = "image field is required";
        }

        return errors
    }


    const onSubmit = async (event) => {
        var value = await validation();
        if (!isEmpty(value)) {
            setError(value)
        }
        else {

            var passData = new FormData();

            passData.append("page", formValue.page);
            passData.append("metatitle", formValue.metatitle);
            passData.append("metadescription", formValue.metadescription);
            passData.append("ogimage", files);
            passData.append("faqSchema", formValue.faqSchema);
            passData.append("faqJson", formValue.faqJson);

            var metadataadd = await addmetadata(passData)
            if (metadataadd.status == true) {
                toast.success(" MetaTags added successfully ")
                setTimeout(() => {
                    history.push("/pages/metadata");
                }, 2000)
            }
            else {
                toast.error("page already defined ")
            }



        }



    }


    return (
        <>
            <ToastContainer />
            <div>
                <div className='row'>
            <div class="col-md-12 mb-3">
                <h1>Add Meta Tags</h1>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="egpage">Page</label>
                    <input type="text" name="page" class="form-control" id="page" placeholder="url" value={formValue.page} onChange={(e) => handlechange(e)} />
                    <span className="errors_style" id="page-error" >{errors && errors.page}</span>
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

                <div class="col-md-12 mb-3">
                    <label for="ogimage">Og Image</label>
                    <input type="file" name="ogimage" className='mx-3' id="ogimage" onChange={(event) => onChangeValue(event)} />
                    {typeof files == "object" ? <img height="100" width="100" src={URL.createObjectURL(files)} /> : <></>}
                    <span className="errors_style" id="ogimage-error" >{errors && errors.ogimage}</span>

                </div>
                <div class="col-md-12 mb-3">
                <Link target="_blank" to={{ pathname: `/pages/FAQgen` }} >   <button type="button" class="btn btn-success">Generate FAQ</button></Link>
                 </div>
                <div class="col-md-12 mb-3">
                    <label for="">Faq Schema</label>
                    <textarea type="text" name="faqSchema" id="faqSchema" class="form-control mb-2 editor" placeholder="Faq Schema" value={formValue.faqSchema} onChange={(e) => handlechange(e)}></textarea>
                </div>

                <div class="col-md-12 mb-3">
                    <label for="">Faq Json</label>
                    <textarea type="text" name="faqJson" id="faqJson" class="form-control mb-2 editor" placeholder="Faq Json" value={formValue.faqJson} onChange={(e) => handlechange(e)}></textarea>
                </div>
                <div class="col-md-12 mb-3">
                <button class="btn btn-primary" id="addmetadata" name="addmetadata" type="button" onClick={(event) => onSubmit(event)}>Save</button>
                </div>
                </div>

            </div>
        </>
    )

}


