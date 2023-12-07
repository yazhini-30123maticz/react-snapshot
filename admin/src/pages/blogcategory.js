


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { blogcategorylist,Status } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import ReactDatatable from '@ashvin27/react-datatable';



export default function Blogcategory() {

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
            key: "category_name",
            text: "Category name",
            align: "left",
            sortable: true,
        },
        {
            key: "created_date",
            text: "Created Date",
            align: "left",
            sortable: true,
        },
        {
            key: "customUrl5",
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
         <Link to={{pathname:`/pages/editblogcategory`,state:record}} > <button type="button" name="edit" class="edit_bnt" >edit</button></Link>
                </>
        }
    ]

 

 
useEffect(() => {
    listblog();
}, [])


const listblog = async () => {
    var listcategory = await blogcategorylist()
    if (listcategory?.data?.data) {
        setList(listcategory?.data?.data)
    }
}



    return (
        <>
            <ToastContainer />
            <div>
                <Link to='/pages/addblogcategory'><button class="btn btn-primary" id="addcat" name="addcat" type="button" >ADD BLOG CATEGORY</button></Link>
                <h1 className='my-4'> Blog Category</h1>

                <ReactDatatable
                    records={list?.data}
                    columns={columns}
                />



            </div>
        </>
    )

}


