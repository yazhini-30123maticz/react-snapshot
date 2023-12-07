import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import {metadatalist } from '../api/api';
import { isEmpty } from '../config/common'
import ReactDatatable from '@ashvin27/react-datatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';



export default function Metadata() {
  
    const [list, setList] = useState([])
   
    const columns = [
        {
            key: "",
            text: "SNO",
            align: "left",
            sortable: true,
            cell: (record, index) =>
                <div>{index + 1}
                </div>
        },
        {
            key: "page",
            text: "page",
            align: "left",
            sortable: true,
        },
        {
            // key: "customUrl5",
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
                  
          <Link to={{pathname:`/pages/metachild`,state:record}} > <button type="button" name="metachild" class="edit_details" >Edit Details</button></Link>
         <Link to={{pathname:`/pages/editmetadata`,state:record}} > <button type="button" name="edit" class="edit_btn" >Edit</button></Link>
                </>
        }
    ]


    useEffect(() => {
        listblog();
    }, [])

    const listblog = async () => {
        var listmetadata = await metadatalist()

        if (listmetadata?.data?.data) {
            setList(listmetadata?.data?.data)
   
          
        }
    }



  

    return (
        <>
            <ToastContainer/>
            <div>
     
                <Link to='/pages/addmetadata'><button class="btn btn-primary" id="metadata" name="metadata" type="button" >ADD METATAGS</button></Link>
                <h1 className='my-4'>Meta Tags</h1>
                <ReactDatatable

                 records={list.data}
                 columns={columns}
                />
            </div>
        </>
    )

}


