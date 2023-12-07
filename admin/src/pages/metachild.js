import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { metachildlist } from '../api/api';
import { isEmpty } from '../config/common'
import ReactDatatable from '@ashvin27/react-datatable';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config/config';



export default function Metachild(props) {

    const [list, setList] = useState([])


    const { state } = props;
    var recordd = {
        _id: props?.location?.state?._id,
    
    }
    

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
            cell: (record) =>
                <>
               {record.metatagid.page}
                </>

        },
        {
            key: "tagtype",
            text: "tagtype",
            align: "left",
            sortable: true,
        },
        {
            key: "tagname",
            text: "tagname",
            align: "left",
            sortable: true,
        },
        {
            key: "tagcontent",
            text: "tagcontent",
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

                    <Link to={{ pathname: `/pages/editmetachild`, state: {...record,...{metatagid:props?.location?.state?._id}} }} > <button type="button" name="edit" class="edit_btn" >edit</button></Link>
                </>
        }

    ]


    useEffect(() => {
        listfn();
    }, [])

    const listfn = async () => {
        
        var list = await metachildlist(recordd)
      
        if (list?.data?.data) {
            setList(list?.data?.data)
        }
    }




    return (
        <>
            <ToastContainer />
            <div>
                <Link to={{ pathname: `/pages/addmetachild`, state: recordd }} > <button type="button" id="metadatachild" name="metadatachild" class="metadatachild btn btn-primary" >ADD METATAG CHILD</button></Link>
                <h1>Meta Tags</h1>
                <ReactDatatable

                    records={list?.data}
                    columns={columns}
                />
            </div>
        </>
    )

}


