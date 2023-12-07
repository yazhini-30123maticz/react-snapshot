import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useLocation, useHistory } from 'react-router-dom';
import { CKEditor } from 'ckeditor4-react';
import { editblogcategory } from '../api/api';
import { isEmpty } from '../config/common'
import { ToastContainer, toast } from 'react-toastify';
import config from '../config/config';
import "../assets/styles/style.css"

export default function Faqgenerate(props) {
    const [faq, setFaq] = useState({})
    const [editor, setEditor] = useState({})
    const [name, setName] = useState(false)
    const [questionanswer, setQuestionanswer] = useState(false)
    const [schema1, setSchema1] = useState('<script type="application/ld+json">{"@context": "https://schema.org","@type": "FAQPage","mainEntity": [')
    const [json, setjson] = useState('[')
    const [count, setCount] = useState(0)
    const [queans, setqueans] = useState([])


  
    const handlechange = (e) => {
        var { name, value } = e.target;
        setFaq((faq) => ({ ...faq, [name]: value }));
    }

    const ckeditorchange = (evt) => {
     
        var data = evt.editor.getData();
        const name = evt.editor.name;
        setEditor((editor) => ({ ...editor, [name]: data }));
    }

    const addquestion = (e) => {
        var i = count;
        i++;
        var data = editor.answer
        var que = '<div class="panel panel-default"><div id="' + i + '" class="panel-heading" role="tab"><h4 class="panel-title"><a class="collapsed" href="#m' + i + '" data-toggle="collapse" data-parent="#accordion" aria-expanded="false" aria-controls="collapsene"> ' + faq.question + ' </a></h4></div><div id="m' + i + '" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="' + i + '"><div class="panel-body"><p>' + data + '</p></div></div></div>';
        var newjson = json
        newjson = newjson.concat('{"que":"' + faq.question + '","ans":"' + data + '"},');
        var script = schema1
        script = script.concat('{"@type": "Question","name": "' + faq.question + '","acceptedAnswer": {"@type": "Answer","text": "&lt;p&gt;' + data + '&lt;/p&gt;"}},');
       
        var user = ' <p><b> ' + i + ' . Question :</b> ' + faq.question + '</p><p><b> Answer :</b> ' + data + ' </p><hr>';
        var setting = { "question": faq.question, "answer": editor.answer }
        var set = queans
        set.push(setting)

        setqueans(set)
        setSchema1(script)
        setjson(newjson)
        setQuestionanswer(true)
        setCount(i)

        setFaq({ question: "" })
        setEditor({ answer: "  " })
      
    }


    const addname = (e) => {
        var result = "FAQ - " + faq.name;
        setjson(result)
        setName(true)
    }


    var flag = 1;
    var onlyflag = 1;
    var script = '<script type="application/ld+json">{"@context": "https://schema.org","@type": "FAQPage","mainEntity": [ ';
    var newjson = '[';



    const copyschema = (data) => {
        var schemacopy;
        var script1
        if (onlyflag && flag) {
            script1 = schema1.slice(0, -1)

            script1 = script1.concat("]}</");
            script = script1.concat("script>");
            var sch = schema1

            schemacopy = sch
            setSchema1(schemacopy)

            newjson = newjson.slice(0, -1);
            newjson = newjson.concat(']');

            flag = 0;
        }
        var copyText = script;
        navigator.clipboard.writeText(copyText);
    }



    const copyjson = (data) => {
        var jsoncopy;
        var script1
        var script2;
        if (onlyflag && flag) {
            script1 = json.slice(0, -1)
            script2 = script1.concat("]");
            script = script2.concat("script>");



            var jsonn = json
            jsoncopy = jsonn
            setjson(jsoncopy)
            onlyflag = 0;
        }
        var copyText = script2;
        navigator.clipboard.writeText(copyText);
    }





    return (
        <>
            <div>
                <div className="d-flex align-items-center auth px-0">
                    <div className="row w-100 mx-0">
                        <div className="col-lg-6">
                            <div className="card text-left py-5 px-4 px-sm-5">
                                <div className="brand-logo">
                                </div>
                                <h1>FAQ Generator </h1>



                                <label for="fname">FAQ Name :</label>

                                <input type="text" id="faqn" name="name" placeholder="Your FAQ name.." value={faq.createfaqname} onChange={(e) => handlechange(e)} /><br></br>

                                <button class="btn btn-primary" id="createfaqname" name="createfaqname" type="button" onClick={(event) => addname(event)}>Create faq name</button>



                                <label for="lname">Question :</label>
                                <input type="text" id="question" name="question" placeholder="Your Question.." value={faq.question} onChange={(e) => handlechange(e)} />



                                <label for="subject">Answer :</label>
                                <CKEditor
                                    name="answer"
                                    id="answer111"
                                    onChange={ckeditorchange}
                                    value={editor?.answer}
                                // onChange={onEditorChange}
                                />

                                <br></br>

                                <button class=" btn btn-primary" id="addquestion" name="addquestion" type="button" onClick={(event) => addquestion(event)}>Add Question</button>

                            </div>
                        </div>
                        <div className="col-lg-6" style={{ backgroundColor: '#000', color: '#fff' }}>
                            <div className="new" >

                                <button name="json" id="json" className="butt copyths mx-2" style={{ float: 'right' }} type="button" onClick={(event) => copyjson(event)}>Copy JSON</button>

                                <button name="schema" id="schema" className="butt copythat" style={{ float: 'right' }} type="button" onClick={(event) => copyschema(event)}>Copy Schema</button>

                                <h2 className="blogTitle1">FAQ - {name ? faq.name : "Your Faq Name"} </h2>
                                {/* {name ? <p id="req_sumbit_success_msg_">{faq.name}</p> : <></>} */}
                                {/* dangerouslySetInnerHTML={{__html:CMS?.dropspage?.answer}}  */}
                                {/* {questionanswer ? <> <h2 className="blogTitle1">Question - </h2> <p id="req_sumbit_success_msg_">{faq.question}</p></> : <></>}

                                {questionanswer ? <><h2 className="blogTitle1">Answer - </h2><div dangerouslySetInnerHTML={{ __html: editor.answer }} id="req_sumbit_success_msg_"></div></> : <></>}
                          */}
                                {queans?.length > 0 && queans?.map((val, index) => {
                            

                                    return (
                                        <>
                                            <h2 className="blogTitle1" > {index + 1}.Question -</h2> <p id="req_sumbit_success_msg_" >{val.question}</p>
                                            <h2 className="blogTitle1">Answer - </h2><p dangerouslySetInnerHTML={{ __html: val.answer }} id="req_sumbit_success_msg_"></p>
                                        </>
                                    )
                                })}

                            </div>
                            <div className="col" style={{ backgroundColor: '#bbb', display: 'none' }}>
                                <div className="tocopy">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}


