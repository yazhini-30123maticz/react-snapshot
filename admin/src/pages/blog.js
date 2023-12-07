


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
// import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { blogcategoryfind, addblogsave } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactDatatable from '@ashvin27/react-datatable';
import { bloglist, count, deletefn } from '../api/api';
import { id } from 'date-fns/locale';
import { useHistory } from "react-router-dom";


export default function Blog() {

    // let navigate = useNavigate();
    const [list, setList] = useState([])
    const [trend, setTrend] = useState({})
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
            key: "",
            text: "Category",
            align: "left",
            sortable: true,
            cell: record => { return record?.blog_category?.category_name }
        },
        {
            key: "title",
            text: "Title",
            align: "left",
            sortable: true,
        }

        ,
        {
            key: "image",
            text: "Image",
            align: "left",
            sortable: true,
        },

        {
            key: "like",
            text: "Likes",
            align: "left",
            sortable: true,
            cell: record => { return record?.like?.length }
        },
        {
            key: "created_date",
            text: "Created Date",
            align: "left",
            sortable: true,
            cell: record => {
                return new Date(record?.created_date).toLocaleString()

            }
        },

        {
            key: "trending",
            text: "Trending",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
                    <input type="checkbox" id="box" name="box" checked={record?.trending || record?.trending == "true" ? true : false} onChange={() => trendingfn(record)} />

                </>
        },
        {
            key: "customUrl5",
            text: "Action",
            align: "left",
            sortable: true,
            cell: (record) =>
                <>
                    {console.log("list", list, list?.Valid)}
                    <Link to={{ pathname: `/pages/editblog`, state: record }} > <button type="button" name="edit" class="edit_btn" >edit</button></Link>
                    {list?.Valid && <button type="button" name="delete" class="delete_btn" onClick={() => onsubmit(record)}>Delete</button>}
                </>
        }
    ]

    const onsubmit = async (record) => {
        var data = {
            id: record._id,
        }
        var check = window.confirm("text");
        if (check) {
            var delfn = await deletefn(data)
            if (delfn) {
                listblog();
            }
        }

    }


    useEffect(() => {
        listblog();
    }, [])

    const listblog = async () => {
        var list = await bloglist()
        if (list?.data) {
            setList(list?.data)

        }
    }

    const trendingfn = async (record) => {
        var data = {
            id: record._id,
            status: record.trending,
            categoryid: record.blog_category._id
        }


        var trending = await count(data)

        if (trending) {
            if (trending?.status == true) {
                listblog()
                toast.success(trending.message)

            }
            else{
                toast.error(" 3 blog selected already")
            }

        }
    }




    return (
        <>
            <ToastContainer />
            <div>
                <Link to='/pages/addblog'><button class="btn btn-primary" id="blog" name="blog" type="button" >ADD BLOG</button></Link>
                <h1 className='my-4'>BLOG LIST</h1>

                <ReactDatatable
                    records={list?.data}
                    columns={columns}
                />
            </div>
        </>
    )

}


