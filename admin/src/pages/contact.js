


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import {contactlist } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import ReactDatatable from '@ashvin27/react-datatable';



export default function Contact() {

    const [contact, setcontact] = useState([])

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
            key: "name",
            text: "name",
            align: "left",
            sortable: true,
      
        },  
        {
            key: "email",
            text: "E-mail",
            align: "left",
            sortable: true,
        },
        {
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
         <Link to={{pathname:`/pages/contactdetails`,state:record}} > <button  type="button" name="details" class="details details_btn" >Details</button></Link>
        }
    ]

 

 
useEffect(() => {
    listcontact();
}, [])


const listcontact = async () => {
    var contact = await contactlist()
    if (contact?.data?.data) {
        setcontact(contact?.data?.data.data)
    }
}



    return (
        <>
            <ToastContainer />
            <div>
                
                <h1> Contact Us </h1>

                <ReactDatatable
                    records={contact}
                    columns={columns}
                />



            </div>
        </>
    )

}


