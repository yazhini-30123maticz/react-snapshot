


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { listsitemap,deletesitemap } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import ReactDatatable from '@ashvin27/react-datatable';



export default function Sitemap() {

    const [sitemap, setSitemap] = useState([])

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
            key: "location",
            text: "Location",
            align: "left",
            sortable: true,

        },

       
        {
            key: "priority",
            text: "Priority",
            align: "left",
            sortable: true,
        },
        {
       
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
                    <Link to={{ pathname: `/pages/editsitemap`, state: record }} > <button type="button" name="edit" class="edit" >edit</button></Link>
                    <button type="button" name="delete" class="Delete" onClick={() => onsubmit(record)}>Delete</button>
                </>
        }
    ]




    useEffect(() => {
        sitemaplistfn();
    }, [])


    const sitemaplistfn = async () => {
        var sitemap = await listsitemap()
       
        if (sitemap?.data?.data) {
            setSitemap(sitemap?.data?.data)
        }
    }



    const onsubmit = async (record) => {
        var data = {
            _id: record._id,
        }
            var check = window.confirm("text");
            if (check) {
                var delfn = await deletesitemap(data)
                if(delfn){
                  
                    sitemaplistfn();

                }
              }
       
        }


    return (
        <>
            <ToastContainer />
            <div>
                <Link to='/pages/addsitemap'><button class="btn btn-primary" id="sitemapadd" name="sitemapadd" type="button" >ADD SITE MAP</button></Link>

                <h1 className='my-4'> Site Map</h1>
                <ReactDatatable
                    records={sitemap?.data}
                    columns={columns}
                />



            </div>
        </>
    )

}


