


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { listredirect,deleteredirection} from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import ReactDatatable from '@ashvin27/react-datatable';



export default function Redirection() {

    const [redirect, setAddredirect] = useState([])

    const columns = [
        {
     
            text: "SNO",
            align: "left",
            sortable: true,
            cell: (record, index) =>
                <div>{index + 1}
                </div>
        },
        {
            key: "Oldurl",
            text: "Oldurl",
            align: "left",
            sortable: true,

        },

       
        {
            key: "Newurl",
            text: "Newurl",
            align: "left",
            sortable: true,
        },
        {
       
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
                    <Link to={{ pathname: `/pages/editredirection`, state: record }} > <button type="button" name="edit" class="edit_btn" >edit</button></Link>
                    <button type="button" name="delete" class="delete_btn" onClick={() => onsubmit(record)}>Delete</button>
                </>
        }
    ]




    useEffect(() => {
        listfn();
    }, [])


    const listfn = async () => {
        var redirect = await listredirect()
     
        if (redirect?.data?.data) {
            setAddredirect(redirect?.data?.data)
        }
    }



    const onsubmit = async (record) => {
        var data = {
            _id: record._id,
        }
            var check = window.confirm("text");
            if (check) {
                var delfn = await deleteredirection(data)
                if(delfn){
                    
                    listfn();
                }
              }
       
        }


    return (
        <>
            <ToastContainer />
            <div>
                <Link to='/pages/addredirection'><button class="btn btn-primary" id="redirect" name="redirect" type="button" >ADD REDIRECTION</button></Link>

                <h1 className='my-4'>Redirection</h1>
                <ReactDatatable
                    records={redirect?.data}
                    columns={columns}
                />



            </div>
        </>
    )

}


