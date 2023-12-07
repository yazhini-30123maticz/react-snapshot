const express = require('express');
// const router        = express.Router();
const mongoose = require('mongoose');
const contactUs = require('../models/contact')
const Settings = require('../models/settings')
const Blogs = require('../models/blogs')
const BlogCategory = require('../models/blog_category')
const careercategory = require('../models/career_category')
const Requestquote = require('../models/requestquote')
const TechnicalDemo = require('../models/technical_demo')
const getInstance = require('../models/get_instance_quote')
const freeDemo = require('../models/free_demo')
const talkExperts = require('../models/talk_experts')
const AskedQuestions = require('../models/asked_questions')
const Newsletter = require('../models/newsletter')
const metaTags = require('../models/meta_tags')
const metaTagsChild = require('../models/meta_tags_child')
const careers = require('../models/careers')
// const formValidation = require('../validation/formValidation')
const contentschema = require('../models/contentschema')
// const multer = require('multer');
const path = require('path')
var ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');
const Sitemap = require('../models/sitemap')
var fs = require('fs');
const js2xmlparser = require("js2xmlparser");
import { find, findone, Save } from "../helper/mongooseHelper";
import contact from "../models/contact";
// import {fileread} from '../server'

export const home = async (req, res) => {

  var path = 'home'
  var pageViceMetaTagData = await pageViceMetaTag(req, res)
  var metaChildData = pageViceMetaTagData.metaChildData
  var metaTagData = pageViceMetaTagData.metaTagData
  console.log("metaTagData", metaTagData);
  var dataa = { DBname: Blogs, findata: { status: 1 }, sort: { _id: -1 }, limit: 3 }
  var OurBlog = await find(dataa);
  // var OurBlog = await Blogs.find({ status: "1" }).sort({ _id: -1 }).limit(3)
  return res.json({ status: true, message: '  Successfully', data: { OurBlog: OurBlog, metaChildData: metaChildData, metaTagData: metaTagData, path: path, includeMetaTag: '' } })
}

export const getrequestquote = async (req, res) => {

  try {
    var path = req.path.split('/')[1]
    var pageViceMetaTagData = await pageViceMetaTag(req, res)
    var metaChildData = pageViceMetaTagData.metaChildData
    var metaTagData = pageViceMetaTagData.metaTagData
    console.log("metaTagData", metaTagData);

    return res.json({ status: true, message: 'request was Sent Successfully', data: { metaChildData: metaChildData, metaTagData: metaTagData, includeMetaTag: '', path: path } })
  }
  catch (err) {
    console.log("getrequestquote");
  }
}

export var categoryfind = async (req, res) => {
  try {
    var dataa = { DBname: contentschema, findata: {} }
    var data = await find(dataa);
    if (data) {
      res.json(data)
    }
  }
  catch (err) {
    res.json(err)
  }
};

export const contactfn = async (req, res) => {
  try {
    var data = { DBName: contactUs, Data: { name: req.body.name, contact: req.body.number, country: req.body.country, email: req.body.email, socialId: req.body.socialid, category: req.body.category, subcategory: req.body.subcategory, description: req.body.description, created_date: new Date() } }
    var result = await Save(data)
    if (result) {
      return res.json({ status: true, message: 'Contact was Sent Successfully' })
    } else {
      return res.json({ status: false, message: 'Error Occured' })
    }
  }
  catch (e) {
    console.log("contact  error", e);
  }
}

export const requestquote = async (req, res) => {

  try {
    if (req?.files) {
      var uploadpath = "./public/images/"
      await fs.mkdir(uploadpath, { recursive: true }, async function (err) {
        if (err) { console.log("failed to create path") }
        else {
          req?.files?.files.mv(uploadpath + req.files.files.name, function (err, data) {
            if (err) {
              console.log("err")
            }
            else {
              var data = { DBName: Requestquote, Data: { email: req.body.email, name: req.body.name, contact: req.body.contact, country: req.body.country, category: req.body.category, subcategory: req.body.subcategory, file: (req?.files && req?.files?.files.name) ? req?.files?.files?.name : "", requirement: req.body.requirement, created_date: new Date() } }
              var result = Save(data)
              if (result) {
                return res.json({ status: true, message: 'Contact was Sent Successfully' })
              } else {
                return res.json({ status: false, message: 'Error Occured' })
              }
            }
          });
        }
      })
    }
    else {
      var data = { DBName: Requestquote, Data: { email: req.body.email, name: req.body.name, contact: req.body.contact, country: req.body.country, category: req.body.category, subcategory: req.body.subcategory, file: (req?.files && req?.files?.files.name) ? req?.files?.files?.name : "", requirement: req.body.requirement, created_date: new Date() } }
      var result = Save(data)
      if (result) {
        return res.json({ status: true, message: 'Contact was Sent Successfully' })
      } else {
        return res.json({ status: false, message: 'Error Occured' })
      }
    }
  }
  catch (err) {
    console.log("requestquote error");
  }
}

export const newsletter = async (req, res) => {
  try {
    var data = { DBName: Newsletter, finData: { email: req.body.email }, projectdata: {} }
    var check = await findone(data);
    if (check) {
      return res.json({ status: false, message: 'Already Subscribed' })
    }
    else {
      var data = { DBName: Newsletter, Data: { email: req.body.email, page: req.body.page } }
      var result = await Save(data);
      if (result) {
        return res.json({ status: true, message: 'Newsletter Added Successfully' })
      } else {
        return res.json({ status: false, message: 'Error occured' })
      }
    }
  }
  catch (err) {
    return res.json({ status: false, message: 'catch occured' })
  }
}

export var getmetadata = async (req, res) => {
  try {
    var fullUrl = req.query.url
    var otherUrl = fullUrl[fullUrl?.length - 1] == '/' ? fullUrl.substring(0, fullUrl?.length - 1) : fullUrl.concat('/');
    var dataa = { DBName: metaTags, finData: { $or:[{page: req.query.url},{ page: otherUrl}] }, projectdata: {} }
    var data = await findone(dataa);
    if (data) {
      res.json({ sucess: 'success', data: { metaTagData: data } })
    }
    else {
      res.json({ sucess: 'error', data: null })
    }
  }
  catch (err) {
    console.log("getmetadata err", err);
    res.json(err)
  }
};

async function pageViceMetaTag(req, res) {
  // var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl //load in Node Full Url
  var fullUrl = "https://nounq.com" + req.originalUrl;
  // console.log(req.get('host'),'-------->>>>')
  if (req.get('host') == "www.maticz.com") {
    res.redirect('https://maticz.com' + req.originalUrl)
  }
  // console.log("fullUrl",fullUrl);
  var data = { DBName: metaTags, finData: { page: fullUrl }, projectdata: {} }
  var metaTagData = await findone(data)
  var dataa = { DBname: contentschema, findata: {} }
  var data = await find(dataa);
  if (metaTagData == null) {
    metaTagData = { contactcategory: data }
  }
  else {
    metaTagData.contactcategory = data
  }
  // console.log('metatatata', metaTagData.metaTitle, fullUrl)
  if (metaTagData) {
    var dataa = { DBname: metaTagsChild, findata: { metaTagId: metaTagData._id } }
    var metaChildData = await find(dataa);
    // var metaChildData = await metaTagsChild.find({ metaTagId: metaTagData._id })
    return { status: true, metaChildData: metaChildData, metaTagData: metaTagData, fullUrl: fullUrl }
  } else {
    return { status: false, metaChildData: false, metaTagData: false, fullUrl: fullUrl }
  }
}

export const sitemap = async function (req, res, next) {
  console.log("shdjfhjsdkh");
  try {
    const records = await getRecordsFromDataSource();
    const collection = [];
    for (let i = 0; i < records.data.length; i++) {
      const url = {};
      url.loc = records.data[i].location
      url.priority = records.data[i].priority;
      url.changefreq = records.data[i].changefrequency;
      collection.push(url);
      // console.log(" url", collection.data);
    }
    const col = {
      "@": {
        xmlns: "https://www.sitemaps.org/schemas/sitemap/0.9",
        // "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
      },
      url: collection,
    };
    const xml = js2xmlparser.parse("urlset", col);
    res.set("Content-Type", "text/xml");
    res.json({ data: xml });
  } catch (e) {
    next(e);
  }
}

async function getRecordsFromDataSource() {
  try {
    var data = { DBname: Sitemap, findata: {}, sort: { _id: 1 } }
    var record = await find(data);
    console.log("record",record);
    return record;
  }
  catch (e) {
    console.log("Sitemap catch error");
  }
}

function errorPageRedirect(req, res) {  //404 ERROR PAGE FUNCTION
  return res.json({ message: "error occured" })
  // res.render('front/404error.ejs')
}

export const blog = async (req, res) => {
  // console.log("req.path",req.get('origin')+req.path);


  try {
    var path = req.path.split('/')[1]

    var pageViceMetaTagData = await pageViceMetaTag(req, res)
    var metaChildData = pageViceMetaTagData.metaChildData
    var metaTagData = pageViceMetaTagData.metaTagData
    // console.log("metaTagData",metaTagData);

    //  console.log("blogg",metdata);
    var data = { DBname: Blogs, findata: { status: 1, deleted: { $ne: true }, listed: { $ne: 'unlist' }, bloglist: { $ne: 'hide' } }, projectdata: { "slug": 1, "image": 1, "blog_category": 1, "title": 1, "meta_description": 1, "faqSchema": 1, "faqJson": 1 }, sort: { _id: -1 }, populate: 'blog_category', limit: 3 }
    var BlogsData = await find(data)


    var data = { DBname: BlogCategory, findata: { status: 1 }, projectdata: { "slug": 1, "category_name": 1, "meta_description": 1 }, sort: { _id: -1 } }
    var BlogCategoryData = await find(data)

    var data = { DBname: Blogs, findata: { trending: true, status: 1, deleted: { $ne: true }, listed: { $ne: 'unlist' }, bloglist: { $ne: 'hide' } }, sort: { _id: -1 }, projectdata: { "slug": 1, "image": 1, "blog_category": 1, "title": 1, "meta_description": 1 }, populate: 'blog_category', limit: 3 }
    var trendingblogs = await find(data);

    var BlogCategoryblogs = await BlogCategory.aggregate([
      { $match: { status: '1' } },
      {
        $lookup: {
          from: "blog",
          let: { "id": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$blog_category", "$$id"] }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 9 },
            { $project: { "slug": 1, "title": 1, "image": 1 } }
          ],
          as: "Blogs"
        }
      },
      {
        $match: {
          $expr: { $gte: [{ $size: "$Blogs" }, 3] }
        }
      },
      { $sort: { _id: -1 } },
      { $limit: 3 },
      { $project: { "slug": 1, "category_name": 1, "Blogs": 1 } }
    ])




    return res.json({ status: true, message: 'blog listed  Successfully', data: { metaChildData: metaChildData, metaTagData: metaTagData, includeMetaTag: '', path: path, Blogs: BlogsData, BlogCategory: BlogCategoryData, TrendingBlogs: trendingblogs, BlogCategoryblogs: BlogCategoryblogs } })
  }
  catch (e) {
    console.log("Blog catch error", e);
    return res.json({ status: false, message: 'Blog catch error' })
  }
}


export const category = async (req, res) => {
  try {
    var url = req.query.slug
    // var data = { DBname: BlogCategory, findata: { slug: req.query.slug } }
    // var category = await find(data)
    // var categoryid = await category.data[0]._id
    var data = { DBname: Blogs, findata: { trending: true, status: 1, deleted: { $ne: true }, listed: { $ne: 'unlist' }, bloglist: { $ne: 'hide' } }, sort: { _id: -1 }, projectdata: { "slug": 1, "image": 1, "blog_category": 1, "title": 1, "meta_description": 1 }, populate: 'blog_category', limit: 7 }
    var trendingblogs = await find(data)

    var BlogsData = await BlogCategory.aggregate([
      { $match: { status: "1", slug: url } },
      {
        $lookup: {
          from: "blog",
          let: { "id": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$blog_category", "$$id"] }
              }
            },
            { $sort: { _id: -1 } },
            { $limit: 3 },
            { $project: { "slug": 1, "title": 1, "meta_description": 1, "image": 1 } }
          ],
          as: "Blogs"
        }
      },
      { $limit: 1 }
    ])


    var data = { DBname: BlogCategory, findata: { status: 1 }, projectdata: { "slug": 1, "category_name": 1, "meta_title": 1, "meta_description": 1 }, sort: { _id: -1 } }
    var BlogCategoryData = await find(data)

    var data = { DBName: BlogCategory, finData: { slug: req.query.slug, status: 1 }, projectdata: { "meta_title": 1, "category_name": 1, "meta_description": 1 } }
    var metadetail = await findone(data)

    var path = req.path.split('/')[1]
    var pageViceMetaTagData = await pageViceMetaTag(req, res)
    var metaChildData = pageViceMetaTagData.metaChildData
    var metaTagData = pageViceMetaTagData.metaTagData
    return res.json({ status: true, message: 'blog listed  Successfully', data: { metaChildData: metaChildData, metaTagData: metaTagData, includeMetaTag: '', path: path, Recentblogs: BlogsData[0], BlogCategory: BlogCategoryData, TrendingBlogs: trendingblogs, Metadetail: metadetail } })
  }
  catch (e) {
    console.log("Blogcategory catch error", e)
    return res.json({ status: false, message: 'Blogcategory catch error' })
  }
}

export var loadmore = async (req, res) => {
  try {
    var skip = parseFloat(req.body.skip)
    var nextSkip = skip + 3
    var url = req.body.slug
    var BlogsData = await BlogCategory.aggregate([
      { $match: { status: "1", slug: url } },
      {
        $lookup: {
          from: "blog",
          let: { "id": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$blog_category", "$$id"] },
                    { $eq: ["$status", "1"] },
                    { $ne: ["$deleted", true] },
                    { $ne: ["$listed", "unlist"] },
                    { $ne: ["$bloglist", "hide"] },
                  ]
                }
              }
            },
            { $sort: { _id: -1 } },
            { $skip: skip },
            { $limit: 3 },
            { $project: { "_id": 1, "slug": 1, "image": 1, "title": 1, "meta_description": 1 } }
          ],
          as: "Blogs"
        }
      }
    ])

    var BlogsDataCount = await BlogCategory.aggregate([
      { $match: { status: "1", slug: url } },
      {
        $lookup: {
          from: "blog",
          let: { "id": "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$blog_category", "$$id"] },
                    { $eq: ["$status", "1"] },
                    { $ne: ["$deleted", true] },
                    { $ne: ["$listed", "unlist"] },
                    { $ne: ["$bloglist", "hide"] }
                  ]
                }
              }
            },
            { $count: "test" },
          ],
          as: "Blogs"
        },
      },
      { $unwind: "$Blogs" },
      { $project: { "_id": 0, "count": "$Blogs.test" } }
    ])
    return res.json({ status: true, loadmore: BlogsData[0], nextSkip: nextSkip, count: BlogsDataCount[0].count })
  }
  catch (e) {
    console.log("loadmore catch error", e)
    return res.json({ status: false, message: 'loadmore catch error' })
  }
}

export const blogloadmore = async (req, res) => {
  try {
    var skip = parseFloat(req.body.skip)
    var nextSkip = skip + 3
    var BlogsData = await Blogs.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              { $eq: ["$status", "1"] },
              { $ne: ["$deleted", true] },
              { $ne: ["$listed", "unlist"] },
              { $ne: ["$bloglist", "hide"] },
            ]
          }
        }
      },
      {
        $lookup: {
          from: "blog_category",
          let: { "id": "$blog_category" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$id"]
                }
              }
            }
          ],
          as: "blogcategory"
        }
      },
      { $unwind: "$blogcategory" },
      { $sort: { _id: -1 } },
      { $skip: skip },
      { $limit: 3 },
      { $project: { "_id": 0, "slug": 1, "image": 1, "blog_category": "$blogcategory", "title": 1, "meta_description": 1 } }
    ])
    var BlogsDataCount = await Blogs.find({ status: 1, deleted: { $ne: true }, listed: { $ne: 'unlist' }, bloglist: { $ne: 'hide' } }).count()
    return res.json({ status: true, loadmore: BlogsData, nextSkip: nextSkip, count: BlogsDataCount })
  }
  catch (e) {
    console.log("blogloadmore catch error", e);
  }

}

export const slug = async (req, res) => {
  try {
    var path = 'blog_detail'
    var pageViceMetaTagData = await pageViceMetaTag(req, res)
    console.log("pageViceMetaTagData", pageViceMetaTagData);
    var metaChildData = pageViceMetaTagData.metaChildData
    var metaTagData = pageViceMetaTagData.metaTagData
    var pageUrl = "https://nounq.com/" + req?.query?.slug
    console.log("pageUrl", pageUrl);
    var data = { DBName: Blogs, finData: { slug: req.query.slug, status: 1, deleted: { $ne: true } }, projectdata: { "slug": 1, "blog_category": 1, "views": 1, "likecount": 1, "title": 1, "content": 1, "blogaudio": 1, "disclaimer": 1, "faqSchema": 1, "faqJson": 1, "meta_title": 1, "meta_description": 1, "image": 1, "description": 1 }, populate: 'blog_category' }
    var BlogData = await findone(data)
    // console.log("BlogData",BlogData);
    // var metdata={
    //   "metatitle":BlogData?.meta_title,
    //   "metadescription":BlogData?.meta_description,
    //   "ogimage":BlogData?.image,
    //   "faqSchema":BlogData?.faqSchema,
    //   "faqJson":BlogData?.faqJson,
    //   "url":req.get('origin')+req.path
    // }
    // // console.log("slugg",metdata);
    // var filesss= await fileread(metdata)

    if (BlogData) {
      var data = { DBname: Blogs, findata: { status: 1, deleted: { $ne: true }, listed: { $ne: 'unlist' }, bloglist: { $ne: 'hide' } }, projectdata: { "slug": 1, "image": 1, "blog_category": 1, "title": 1, "meta_description": 1 }, sort: { _id: -1 }, populate: 'blog_category' }
      var RecentBlogs = await find(data)

      var data = { DBname: BlogCategory, findata: { status: 1 }, projectdata: { "slug": 1, "category_name": 1, "meta_description": 1 }, sort: { _id: -1 } }
      var BlogCategoryData = await find(data)
      return res.json({ status: true, RecentBlogs: RecentBlogs, BlogCategory: BlogCategoryData, pageUrl: pageUrl, metaChildData: metaChildData, metaTagData: metaTagData, includeMetaTag: '', path: path, BlogData: BlogData })
    }
    else {
      errorPageRedirect(req, res)
    }
  }
  catch (err) {
    console.log("BlogDetails catch error", err)
    return res.json({ status: false, message: 'BlogDetails catch error' })
  }
}


