


import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { blogcategoryfind, addblogsave } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/styles/style.css'



export default function Addblog() {
    const history = useHistory();
    const [formValue, setFormValue] = useState({ listed: "list", bloglist: "show", disclaimer: "", faqJson: "", faqSchema: "", categoryname: "" })
    const [details, setDetails] = useState({})
    const [file, setFiles] = useState("")
    const [file2, setFiles2] = useState("")
    const [file3, setFiles3] = useState("")
    const [errors, setError] = useState()
    const [editor, setEditor] = useState({})
    const [category, setcategory] = useState({})

    const handlechange = (e) => {
        var { name, value } = e.target;
        setFormValue((formValue) => ({ ...formValue, [name]: value }));
    }

    const onChangeValue = async (e) => {
        setError({})
        var allowedExtensions = /(\.mp3)$/i;
        var { id, value, files } = e.target
        if (id === "upload") setFiles(files[0]);
        else if (id === "upload2") setFiles2(files[0])
        else if ((id === "upload3")) {
            if (!allowedExtensions.test(files[0].name)) {
                setError({ upload3: "Please upload file having extensions .mp3 only." })
                setFiles3('')
                return false
            } else {
                setFiles3(files[0])

            }
        }
        setDetails({ ...details, ...{ [id]: value } })
    }

    const ckeditorchange = (evt) => {
        var data = evt.editor.getData();
        const name = evt.editor.name;
        setEditor((editor) => ({ ...editor, [name]: data }));
    }


    useEffect(() => {
        categoryfn();
    }, [])

   
    const categoryfn = async () => {
        var category = await blogcategoryfind()
        if (category) {
            setcategory(category)
        }
    }

    const validation = async () => {
        let errors = {};
        var allowedExtensions = /(\.mp3)$/i;
        // if (isEmpty(formValue?.categoryname)) {
        //     errors.categoryname = "category field is required";
        // }
        if (isEmpty(formValue?.title)) {
            errors.title = "title field is required";
        }
        if (isEmpty(formValue?.metatitle)) {
            errors.metatitle = "metatitle field is required";
        }
        if (isEmpty(formValue?.metadescription)) {
            errors.metadescription = "metadescription field is required";
        }
        if (isEmpty(formValue?.bannercolor)) {
            errors.bannercolor = "bannercolor field is required";
        }
        if (isEmpty(formValue?.slug)) {
            errors.slug = "slug field is required";
        }
        if (isEmpty(details.upload)) {
            errors.upload = "image field is required";
        }
        if (!isEmpty(details.upload3)) {
            if (!allowedExtensions.test(details?.upload3)) {
                errors.upload3 = "Please upload file having extensions .mp3 only.";
            }
        }
        // if (isEmpty(details.upload2)) {
        //     errors.upload2 = "banner image  field is required";
        // }

        if (isEmpty(editor?.description)) {
            errors.description = "description field is required";
        }
        // if (isEmpty(formValue?.addbannerheading)) {
        //     errors.addbannerheading = "addbannerheading field is required";
        // }
        // if (isEmpty(editor?.addbannercontent)) {
        //     errors.addbannercontent = "add banner content field is required";
        // }

        return errors
    }
    // console.log("formValue.categoryname", formValue.categoryname);
    const onSubmit = async (event) => {
        var value = await validation()
        if (!isEmpty(value)) {

            setError(value)
        }
        else {

            var passData = new FormData();
            if (formValue.editorpick) {
                passData.append("editorpick", formValue.editorpick);
            } else {
                passData.append("editorpick", '0');
            }
            if (formValue.popular) {
                passData.append("popular", formValue.popular);
            } else {
                passData.append("popular", '0');
            } if (file3) {

                passData.append("audio", file3);
            }
            passData.append("file", file);
            passData.append("title", formValue.title);
            passData.append("metatitle", formValue.metatitle);
            passData.append("metadescription", formValue.metadescription);
            passData.append("slug", formValue.slug);
            passData.append("blogdescription", formValue.blogdescription);
            passData.append("description", editor.description);
            // passData.append("addbannerheading", formValue.addbannerheading);
            // passData.append("addbannercontent", editor.addbannercontent);
            passData.append("categoryname", formValue.categoryname == "" ? category.data[0]._id : formValue.categoryname);
            passData.append("faqJson", formValue.faqJson);
            passData.append("faqSchema", formValue.faqSchema);
            passData.append("bannercolor", formValue.bannercolor);
            passData.append("disclaimer", formValue.disclaimer);
            // passData.append("upload2", file2);
            passData.append("listed", formValue.listed);
            passData.append("bloglist", formValue.bloglist);


            var addblog = await addblogsave(passData)

            if (addblog.status == true) {
                toast.success("successfully added")
                setTimeout(() => {
                    history.push("/pages/blog");
                }, 2000)
            }
            else {
                toast.error("slug already defined ")
            }
        }
    };



   



    return (
        <>
            <ToastContainer />
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-12 mx-auto">
                            <div className="card text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                </div>
                                <div class="col-md-12 mb-3">
                                    <h1 className='mb-4'>Add Blog</h1>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="egcategoryname">Category Name</label>
                                    <select name="categoryname" class="form-control" id="Theme" value={formValue.categoryname} onChange={(e) => handlechange(e)}>
                                        {/* <option value="">Choose One</option>
                                    <option value="yellow">Yellow</option>
                                    <option value="blue">Blue</option>
                                    <option value="purple">Purple</option> */}

                                        {category?.data?.length > 0 && category?.data?.map((val) => { return <option value={val._id}>{val.category_name}</option> })}
                                    </select>
                                    <span className="errors_style" id="categoryname-error" >{errors && errors.categoryname}</span>
                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egtitle">Title</label>
                                    <input type="text" name="title" class="form-control" id="title" placeholder="Title" value={formValue.title} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="title-error" >{errors && errors.title}</span>
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
                                    <label for="egbannercolor">Banner Colour Code</label>
                                    <input type="text" name="bannercolor" class="form-control" id="bannercolor" placeholder="Banner Colour Code" value={formValue.bannercolor} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="bannercolor-error" >{errors && errors.bannercolor}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egbannercolor">Slug</label>
                                    <input type="text" name="slug" class="form-control" id="slug" placeholder="Slug" value={formValue.slug} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="slug-error" >{errors && errors.slug}</span>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egimage">Og Image</label>
                                    <input type="file" name="upload" id="upload" className='mx-3' onChange={(event) => onChangeValue(event)} />
                                    {typeof file == "object" ? <img height="100" width="100" src={URL.createObjectURL(file)} /> : <></>}
                                    <span className="errors_style" id="upload-error" >{errors && errors.upload}</span>

                                </div>


                                <div class="col-md-12 mb-3">
                                    <label for="egblogaudio">Blog Audio</label>s
                                    <input type="file" name="upload3" id="upload3" className='mx-3' onChange={(event) => onChangeValue(event)} />
                                    {typeof file3 == "object" ? <audio src={URL.createObjectURL(file3)}
                                        controls
                                        controlsList="nodownload"
                                        // className="audio_align"
                                        alt="audio"
                                        playsInline
                                        loop
                                        muted
                                        type="audio/*"
                                        autostart="off" /> : <></>
                                    }
                                    <span className="errors_style" id="upload3-error" >{errors && errors.upload3}</span>

                                </div>

                                {/* <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Banner Image</label>
                                    <input type="file" name="upload2" id="upload2" onChange={(event) => onChangeValue(event)} />
                                    {typeof file2 == "object" ? <img height="100" width="100" src={URL.createObjectURL(file2)} /> : <></>}
                                    <span className="errors_style" id="upload2-error" >{errors && errors.upload2}</span>
                                </div> */}

                                <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Editors pick</label>
                                    <input type="checkbox" name="editorpick" className='mx-3' id="editorpick" value={formValue.editorsPick || "0"} onChange={(e) => handlechange(e)} />
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Popular</label>
                                    <input type="checkbox" name="popular" id="popular" className='mx-3' value={formValue.popular || "0"} onChange={(e) => handlechange(e)} />
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Blog Description</label>
                                    <input type="text" name="blogdescription" class="form-control" id="blogdescription" placeholder="Blog Description" value={formValue.blogdescription} onChange={(e) => handlechange(e)} />
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Description</label>
                                    <CKEditor
                                        name="description"
                                        onChange={ckeditorchange}

                                    // 	initData={formData?.answer}
                                    // onChange={onEditorChange}
                                    />
                                    <span className="errors_style" id="description-error" >{errors && errors.description}</span>
                                </div>
                                {/* <div class="col-md-12 mb-3">
                                    <label for="egbannerimage">Add Banner Heading</label>
                                    <input type="text" name="addbannerheading" class="form-control" id="addbannerheading" placeholder="Add Banner Heading" value={formValue.addbannerheading} onChange={(e) => handlechange(e)} />
                                    <span className="errors_style" id="addbannerheading-error" >{errors && errors.addbannerheading}</span>
                                </div> */}

                                {/* <label for="">Add Banner Content</label>
                                <CKEditor
                                    name="addbannercontent"
                                    onChange={ckeditorchange}

                                // 	initData={formData?.answer}
                                // onChange={onEditorChange}
                                />
                                <span className="errors_style" id="addbannercontent-error" >{errors && errors.addbannercontent}</span> */}


                                <div class="col-md-12 mb-3">
                                    <label for="">Disclaimer</label>
                                    <textarea name="disclaimer" type="text" id="disclaimer" class="form-control mb-2 editor" placeholder="Disclaimer" value={formValue.disclaimer} onChange={(e) => handlechange(e)}></textarea>
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
                                    <label for="Theme">Listed </label>
                                    <select name="listed" class="form-control" id="listed" value={formValue.listed} onChange={(e) => handlechange(e)}>
                                        {/* <option >select</option> */}
                                        <option value="list">list</option>
                                        <option value="unlist">unlist</option>
                                    </select>
                                </div>

                                <div class="col-md-12 mb-3">
                                    <label for="Theme">Blog List </label>

                                    <select name="bloglist" class="form-control" id="bloglist" value={formValue.bloglist} onChange={(e) => handlechange(e)}>
                                        {/* <option >select</option> */}
                                        <option value="show">show</option>
                                        <option value="hide">hide</option>
                                    </select>
                                </div>
                                <div class="col-md-12 mb-3">

                                    <button class="btn btn-primary" id="addBlogSubmit" name="addBlogSubmit" type="button" onClick={(event) => onSubmit(event)}>Save</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


