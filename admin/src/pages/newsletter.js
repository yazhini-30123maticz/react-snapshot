


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { newsletterlist } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import ReactDatatable from '@ashvin27/react-datatable';



export default function Newsletter() {

    const [newsletter, setnewsletter] = useState([])

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
            key: "email",
            text: "E-mail",
            align: "left",
            sortable: true,
        },
        {
            key: "created_date",
            text: "created_date",
            align: "left",
            sortable: true,
          
        }
    ]




    useEffect(() => {
        listnewsletter();
    }, [])


    const listnewsletter = async () => {
        var newsletter = await newsletterlist()

        if (newsletter?.data?.data) {
            setnewsletter(newsletter?.data?.data)
        }
    }



    return (
        <>
            <ToastContainer />
            <div>

                <h1> Newsletter </h1>

                <ReactDatatable
                    records={newsletter?.data}
                    columns={columns}
                />



            </div>
        </>
    )

}


