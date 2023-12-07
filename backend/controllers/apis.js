
const express = require('express');
const mongoose = require('mongoose');
const contactUs = require('../models/contact')
const Admin = require('../models/admin_users')
const Settings = require('../models/settings')
const BlogCategory = require('../models/blog_category')
const Newsletter = require('../models/newsletter')
const Blogs = require('../models/blogs')
const careercategory = require('../models/career_category')
const categorycareer = require('../models/category_career')
const FreeDemo = require('../models/free_demo')
const RequestQuote = require('../models/requestquote')
const AskedQuestions = require('../models/asked_questions')
const getInstance = require('../models/get_instance_quote')
const TechnicalDemo = require('../models/technical_demo')
const metaTags = require('../models/meta_tags')
const talkExperts = require('../models/talk_experts')
const metaTagsChild = require('../models/meta_tags_child')
const Careers = require('../models/careers')
const contentschema = require('../models/contentschema')
var ObjectId = mongoose.Types.ObjectId;
const moment = require('moment');
const bcrypt = require('bcryptjs');
const config = require('../config/key')
const jwt = require('jsonwebtoken');
const Sitemap = require('../models/sitemap')
const Redirections = require('../models/redirect')
const fs = require('fs');
const path = require('path');
import { decode } from "punycode";

import { find, findone, Save, FindOneAndUpdate, FindOneAndRemove } from "../helper/mongooseHelper";

export const loginn = async (req, res) => {
	var ReqBody = req.body;
	if (ReqBody && ReqBody.path == "login") {
		var checkPassword = ReqBody.password;
		var user = await Admin.findOne({ email: ReqBody.email })
		if (user) {
			const match = await bcrypt.compare(checkPassword, user.password);
			if (match) {
				var payload = { "email": ReqBody.email }
				var tokenhash = jwt.sign(payload, config.secretOrKey)
				var token = `Bearer ${tokenhash}`
				res.status(200).json({ "msg": "successfully logged in", "data": true, "token": token })
			}
			else {
				res.status(200).json({ "msg": "incorrect password", "data": false })
			}
		}
		else {
			res.status(200).json({ "msg": "user not found", "data": false })
		}
	}
}

export var blogcategoryfind = async (req, res) => {
	try {
		var dataa = { DBname: BlogCategory, findata: {} }
		var data = await find(dataa);
		if (data) {
			res.json(data)
		}
	}
	catch (err) {
		res.json(err)
	}
}

export async function addblog(req, res) {
	try {
		var data = { DBName: Blogs, finData: { slug: req.body.slug }, projectdata: {} }
		var blog = await findone(data)
		if (blog) {
			return res.json({ status: false, info: 'error', message: 'slug Already Exist' })
		} else {
			var file = req.files.file;
			var path = './public/admin/images/blog/'
			var audio = req?.files?.audio;
			await fs.mkdir(path, { recursive: true }, async function (err) {
				if (err) return false;
				else if (file.name != "") {
					file?.mv(path + file.name, function (err, data) {
						if (err) return false;
						else return file.name;
					});
				}
				// if (bannerimg.name != "") {
				// 	bannerimg?.mv(path + bannerimg.name, function (err, data) {
				// 		if (err) return false;
				// 		else return bannerimg.name;
				// 	});
				// }
				if (audio && audio?.name != "") {
					audio.mv(path + audio?.name, function (err, data) {
						if (err) false;
						else audio?.name;
					});
				}
			});

			
			if (req.files.audio != undefined) {
				var data = { DBName: Blogs, Data: { blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist } }
			} else {

				var data = { DBName: Blogs, Data: { blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist } }
			}
			var result = await Save(data);
			if (result) {
				return res.json({ status: true, message: 'Blog Added Successfully' })
			} else {
				return res.json({ status: false, message: 'Error Occured' })
			}
		}
	}
	catch (err) {
		console.log("addBlogs err", err);
	}
}

export const blogList = async (req, res) => {
	try {

		const authToken = req.headers['authorization'];
		const token = (authToken && authToken.split(' ')[1]) ?? authToken;
		var emaill
		await jwt.verify(token, config.secretOrKey, (err, user) => {
			if (err) return res.status(200).json({ "Status": false, "msg": "Authentication Failed", success: 'error' })
			else {
				emaill = user.email
				// console.log("user valid",emaill)		
			}
		})
		var Valid;
		if (emaill == 'nounq@gmail.com') {
			Valid = true
		} else {
			Valid = false
		}
		var result = await Blogs.find({}, { "blog_category": 1, "title": 1, "image": 1, "like": 1, "created_date": 1, "trending": 1, "slug": 1 }).sort({ _id: -1 }).populate('blog_category')
		if (result) {
			var dataa = { DBname: Blogs, findata: { trending: true }, count: true }
			var TrendingCount = await find(dataa);
			return res.json({ status: true, message: 'Blog List Successfully', data: { data: result, moment: moment, test: true, trending: TrendingCount, Valid: Valid } })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (e) {
		console.log("blogList err");
	}
}

export async function blogTrending(req, res) {
	try {
		var data = { DBname: Blogs, findata: { trending: true }, count: true }
		var Blogcheck = await find(data)
		if (Blogcheck.data < 3) {
			var data = { DBName: Blogs, finData: { _id: req.body.id }, updata: { $set: { trending: ((req.body.status == 'false' || req.body.status == false) ? true : false) } }, save: { new: true } }
			var updateData = await FindOneAndUpdate(data)
			if (updateData) {
				return res.json({ status: true, message: "Updated Successfully" })
			} else {
				return res.json({ status: false, message: "Error Occured" })
			}
		}
		else if ((req.body.status == true || req.body.status == 'true')) {
			var data = { DBName: Blogs, finData: { _id: req.body.id }, updata: { $set: { trending: ((req.body.status == 'false' || req.body.status == false) ? true : false) } }, save: { new: true } }
			var updateData = await FindOneAndUpdate(data)
			if (updateData) {
				return res.json({ status: true, message: "Updated Successfully" })
			} else {
				return res.json({ status: false, message: "Error Occured" })
			}
		}
		else {
			return res.json({ status: false, message: "3 Blogs Trending Already" });
		}
	}
	catch (err) {
		console.log("blogTrending err");
	}
}

export async function editBlogs(req, res) {
	try {
		var data = { DBName: Blogs, finData: { slug: req.body.slug, _id: { $ne: req.body._id } }, projectdata: {} }
		var blog = await findone(data)
		if (blog) {
			return res.json({ status: false, info: 'error', message: 'slug Already Exist' })
		}
		else {
			var file = req?.files?.file;
			var path = './public/admin/images/blog/'
			var audio = req?.files?.audio;
			await fs.mkdir(path, { recursive: true }, async function (err) {
				if (err) return false;
				else if (file?.name != "") {
					file?.mv(path + file?.name, function (err, data) {
						if (err) return false;
						else return file?.name;
					});
				}
				// if (bannerimg?.name != "") {
				// 	bannerimg?.mv(path + bannerimg.name, function (err, data) {
				// 		if (err) return false;
				// 		else return bannerimg?.name;
				// 	});
				// }
				if (audio && audio?.name != "") {
					audio.mv(path + audio?.name, function (err, data) {
						if (err) false;
						else audio?.name;
					});
				}
			});
			if (audio != undefined && file != undefined) {
				var update = {
					blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
				}
			} else if (audio != undefined && file != undefined) {
				var update = {
					blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
				}
			}
			//  else if (bannerimg != undefined && audio != undefined) {
			// 	var update = {
			// 		blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, addbannerheading: req.body.addbannerheading, addbannercontent: req.body.addbannercontent, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, bannerimage: bannerimg?.name, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
			// 	}
			// } 
			// else if (bannerimg != undefined && file != undefined) {
			// 	var update = {
			// 		blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, addbannerheading: req.body.addbannerheading, addbannercontent: req.body.addbannercontent, image: file.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, bannerimage: bannerimg?.name, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
			// 	}
			// }
			else if (audio != undefined) {
				var update = {
					blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file?.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
				}
			} else if (file != undefined) {

				var update = {
					blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file?.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
				}
			}
			// else if (bannerimg != undefined) {
			// 	var update = {
			// 		blog_category: req.body.categoryName,

			// 		meta_title: req.body.meteTitle,

			// 		meta_description: req.body.metsDescription,
			// 		bannercolour: req.body.bannercolour,
			// 		meta_keywords: req.body.metaKeyword,
			// 		author: req.body.author,
			// 		title: req.body.title,

			// 		slug: req.body.slug,
			// 		epick: req.body.editorsPick,
			// 		popular: req.body.popular,
			// 		faqSchema: req.body.faqSchema,
			// 		addbannerheading: req.body.addBannerheading,
			// 		addbannertext: req.body.addBannertext,
			// 		faqJson: req.body.faqJson,
			// 		disclaimer: req.body.disclaimer,
			// 		deleted: req.body.deleted,
			// 		listed: req.body.listed,
			// 		bannerimage: bannerimg.name,
			// 		blogdescription: req.body.blogdescription,
			// 		bloglist: req.body.bloglist,
			// 	};
			// } 
			else {
				var update = {
					blog_category: req.body.categoryname, meta_title: req.body.metatitle, meta_description: req.body.metadescription, title: req.body.title, description: req.body.description, image: file?.name, slug: req.body.slug, epick: req.body.editorpick, blogaudio: audio?.name, popular: req.body.popular, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson, disclaimer: req.body.disclaimer, listed: req.body.listed, blogdescription: req.body.blogdescription, bannercolour: req.body.bannercolor, bloglist: req.body.bloglist
				}
			}
			var dataa = { DBname: Blogs, findata: { _id: req.body._id } }
			var datas = await find(dataa);

			var data = { DBName: Blogs, finData: { _id: req.body._id }, updata: { "$set": update }, save: { new: true } }
			var result = await FindOneAndUpdate(data)
			if (result) {
				return res.json({ status: true, message: 'Blog Updated Successfully' })
			}
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("editBlogs err", err);
	}
}

export async function listingblog(req, res) {
	try {
		var data = { DBName: Blogs, finData: { slug: req.query.slug, status: 1 }, projectdata: {}, populate: 'blog_category' }
		var result = await findone(data);
		if (result) {
			return res.json({ status: true, editData: result })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("listingblog err");
	}
}

export async function blogDelete(req, res) {
	try {
		var data = { DBName: Blogs, FinData: { _id: req.body.id } }
		var deletedata = await FindOneAndRemove(data)
		if (deletedata) {
			return res.json({ status: true, message: "Deleted Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("blogDelete err");
	}
}

export async function addBlogCategory(req, res) {
	try {
		var data = { DBName: BlogCategory, finData: { category_name: req.body.categoryname }, projectdata: {} }
		var CategoryData = await findone(data)
		if (CategoryData) {
			return res.json({ status: false, info: 'error', message: 'Category Already Exist' })
		}
		var data = { DBName: BlogCategory, finData: { slug: req.body.slug }, projectdata: {} }
		var Categoryslug = await findone(data)
		if (Categoryslug) {
			return res.json({ status: false, info: 'error', message: 'Slug Already Exist' })
		}
		var data = { DBName: BlogCategory, Data: { category_name: req.body.categoryname, slug: req.body.slug, meta_title: req.body.metatitle, meta_description: req.body.metadescription } }
		var result = await Save(data)
		if (result) {
			return res.json({ status: true, message: 'category added Successfully' })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("addBlogCategory err", err);
	}
}

export async function blogCategory(req, res) {
	try {
		var dataa = { DBname: BlogCategory, findata: {}, sort: { _id: -1 } }
		var result = await find(dataa);
		if (result) {
			return res.json({ status: true, message: 'category listed Successfully', data: { data: result, moment: moment, test: true } })
		}
	}
	catch (err) {
		console.log("blogCategory err", err);
	}
}

export async function editBlogCategory(req, res) {
	try {
		var data = { DBName: BlogCategory, finData: { category_name: req.body.categoryname, _id: { $ne: req.body._id } }, projectdata: {} }
		var CategoryData = await findone(data)
		if (CategoryData) {
			return res.json({ status: false, info: 'error', message: 'Category Already Exist' })
		}
		var data = { DBName: BlogCategory, finData: { slug: req.body.slug, _id: { $ne: req.body._id } }, projectdata: {} }
		var Categoryslug = await findone(data)
		if (Categoryslug) {
			return res.json({ status: false, info: 'error', message: 'Slug Already Exist' })
		}
		var updateData = {
			category_name: req.body.categoryname,
			slug: req.body.slug,
			meta_title: req.body.metatitle,
			meta_description: req.body.metadescription

		}
		var data = { DBName: BlogCategory, finData: { _id: req.body._id }, updata: { "$set": updateData }, save: { new: true } }
		var result = await FindOneAndUpdate(data)
		if (result) {
			return res.json({ status: true, message: "Category Updated Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("editBlogCategory err", err);
	}
}

export async function blogCategoryChangeStatus(req, res) {
	try {
		var data = { DBName: BlogCategory, finData: { _id: req.body.id }, projectdata: {} }
		var result = await findone(data)
		if (result) {
			if (result.status == '1') {
				var upadateStatus = '0'
			} else {
				var upadateStatus = '1'
			}
			// var BlogCategoryId = result._id
			// Blogs.updateMany(
			// 	{ blog_category: BlogCategoryId }, //Your Condition
			// 	{ $set: { "status": upadateStatus } } //YOUR JSON contents
			// ).exec((err, data) => { console.log('update--------->.') });
			var data = { DBName: BlogCategory, finData: { _id: req.body.id }, updata: { "$set": { status: upadateStatus } }, save: { new: true } }
			var ress = await FindOneAndUpdate(data)
			if (ress) {
				return res.json({ status: true, message: "Status Changed Successfully" })
			}

		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}

	catch (err) {
		console.log("blogCategoryChangeStatus err", err);
	}
}

export async function contact(req, res) {
	try {
		var dataa = { DBname: contactUs, findata: {}, sort: { _id: -1 } }
		var record = await find(dataa);
		if (record) {
			return res.json({ status: true, message: 'contact listed Successfully', data: { data: record, moment: moment, test: true } })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("contact err", err);
	}
}

export async function requestQuote(req, res) {
	try {
		var dataa = { DBname: RequestQuote, findata: {}, sort: { _id: -1 } }
		var record = await find(dataa);
		if (record) {
			return res.json({ status: true, message: 'Request listed Successfully', data: { data: record, moment: moment, test: true } })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("requestQuote err", err);
	}
}

export async function newsletter(req, res) {
	try {
		var dataa = { DBname: Newsletter, findata: {}, sort: { _id: -1 } }
		var record = await find(dataa);
		if (record) {
			return res.json({ status: true, message: 'Newsletter listed Successfully', data: { data: record, moment: moment, test: true } })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("newsletter err", err);
	}
}

export async function addSitemapfn(req, res) {
	try {
		var dataa = { DBname: Sitemap, findata: { location: req.body.location } }
		var loccheck = await find(dataa)
		if (loccheck.data.length > 0) {
			return res.json({ status: false, info: 'error', message: 'Location is Already in Sitemap' })
		}
		else {
			var data = { DBName: Sitemap, Data: { location: req.body.location, priority: req.body.priority, changefrequency: req.body.changefrequency } }
			var result = await Save(data)
			if (result) {
				return res.json({ status: true, message: 'Site-Map Added Successfully' })
			} else {
				return res.json({ status: false, message: 'Error Occured' })
			}
		}
	}
	catch (err) {
		console.log("addSitemapfn err", err);
	}
}

export async function sitemapList(req, res) {
	try {
		var dataa = { DBname: Sitemap, findata: {}, sort: { _id: -1 } }
		var data = await find(dataa)
		if (data) {
			return res.json({ status: true, message: 'Site-Map Listed Successfully', data: { data: data, test: true } })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("sitemapList err", err);
	}
}

export async function editSitemapfn(req, res) {
	try {
		var editredirection = {
			location: req.body.location,
			priority: req.body.priority,
			changefrequency: req.body.changefrequency
		}
		var dataa = { DBname: Sitemap, findata: { _id: { $ne: req.body._id }, location: req.body.location } }
		var loccheck = await find(dataa)
		if (loccheck?.data?.length > 0) {
			return res.json({ status: false, message: 'Location is Already in Sitemap' })
		}
		else {
			var dataa = { DBName: Sitemap, finData: { _id: req.body._id }, updata: { $set: editredirection }, save: { new: true } }
			var data = await FindOneAndUpdate(dataa)
			if (data) {
				return res.json({ status: true, message: " Site Map Updated Successfully" })
			} else {
				return res.json({ status: false, message: "Error Occured" })
			}
		}
	}
	catch (err) {
		console.log("editSitemapfn err", err);
	}
}

export async function sitemapDelete(req, res) {
	try {
		var data = { DBName: Sitemap, FinData: { _id: req.body._id } }
		var deletedata = await FindOneAndRemove(data)
		if (deletedata) {
			return res.json({ status: true, message: "Deleted Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("sitemapDelete err");
	}

}

export async function addMetaTags(req, res) {

	try {
		var data = { DBName: metaTags, finData: { page: req.body.page }, projectdata: {} }
		var MetaTagFindPage = await findone(data)
		var file = req?.files?.ogimage;
		var path = './public/admin/images/ogimage/'
		await fs.mkdir(path, { recursive: true }, async function (err) {
			if (err) return false;
			else if (file?.name != "") {
				file?.mv(path + file?.name, function (err, data) {
					if (err) return false;
					else return file?.name;
				});
			}
		})
		if (MetaTagFindPage) {
			return res.json({ status: false, error: true, message: 'Page Already exist' })
		}
		var data = { DBName: metaTags, Data: { metatitle: req.body.metatitle, metadescription: req.body.metadescription, page: req.body.page, ogimage: file?.name, faqSchema: req.body.faqSchema, faqJson: req.body.faqJson } }
		var result = await Save(data)
		if (result) {
			return res.json({ status: true, message: 'Meta Tags Added Successfully' })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("addMetaTags err");
	}
}

export async function metaTagss(req, res) {
	try {
		var dataa = { DBname: metaTags, findata: {}, sort: { _id: -1 } }
		var result = await find(dataa);
		if (result) {
			return res.json({ status: true, message: 'Metatags Listed Successfully', data: { data: result, moment: moment, test: true } })
		}
	}
	catch (err) {
		console.log("metaTagss err", err);
	}
}

export async function editMetaTags(req, res) {
	try {
		var data = { DBName: metaTags, finData: { _id: { $ne: req.body._id }, page: req.body.page }, projectdata: {} }
		var MetaTagFindPage = await findone(data)
		var file = req?.files?.ogimage;
		var path = './public/admin/images/ogimage/'
		await fs.mkdir(path, { recursive: true }, async function (err) {
			if (err) return false;
			else if (file?.name != "") {
				file?.mv(path + file?.name, function (err, data) {
					if (err) return false;
					else return file?.name;
				});
			}
		})
		if (MetaTagFindPage) {
			return res.json({ status: false, error: true, message: 'Page Already exist' })
		}
		if (file) {
			var update = {
				metatitle: req.body.metatitle,
				metadescription: req.body.metadescription,
				page: req.body.page,
				ogimage: file?.name,
				faqSchema: req.body.faqSchema,
				faqJson: req.body.faqJson

			}
		} else {
			var update = {
				metatitle: req.body.metatitle,
				metadescription: req.body.metadescription,
				page: req.body.page,
				ogimage: file?.name,
				faqSchema: req.body.faqSchema,
				faqJson: req.body.faqJson
			}
		}
		var data = { DBName: metaTags, finData: { _id: req.body._id }, updata: { $set: update }, save: { new: true } }
		var edit = await FindOneAndUpdate(data)
		if (edit) {
			return res.json({ status: true, message: 'Meta Tags Updated Successfully' })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("editMetaTags err", err);
	}
}

export async function addMetaTagsChild(req, res) {
	try {
		var data = { DBName: metaTagsChild, Data: { metatagid: req.body._id, tagtype: req.body.tagtype, tagname: req.body.tagname, tagcontent: req.body.tagcontent } }
		var result = await Save(data);
		if (result) {
			return res.json({ status: true, message: 'Meta Child Tags Added Successfully' })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("addMetaTagsChild err");
	}
}

export async function metatagschild(req, res) {
	try {
		var dataa = { DBname: metaTagsChild, findata: { metatagid: new mongoose.Types.ObjectId(req.query._id) }, populate: 'metatagid', sort: { _id: -1 } }
		var result = await find(dataa);
		return res.json({ status: true, message: 'Metatags Child Listed Successfully', data: { data: result, test: true } })
	}
	catch (err) {
		console.log("metaTag err", err);
	}
}

export async function editMetaTagsChild(req, res) {
	try {
		var update = {
			tagname: req.body.tagname,
			tagcontent: req.body.tagcontent
		}
		var data = { DBName: metaTagsChild, finData: { _id: req.body._id }, updata: { $set: update }, save: { new: true } }
		var result = await FindOneAndUpdate(data)
		if (result) {
			return res.json({ status: true, message: "Updated Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("editMetaTagsChild err");
	}
}


export async function addRedirectfn(req, res) {
	try {
		var data = { DBname: Redirections, findata: { Oldurl: req.body.Oldurl } }
		var oldcheck = await find(data)
		if (oldcheck?.data?.length > 0) {
			return res.json({ status: false, message: 'Old Url is Already in Redirection' })
		}
		var data = { DBname: Redirections, findata: { Newurl: req.body.Newurl } }
		var newcheck = await find(data)
		if (newcheck?.data?.length > 0) {
			return res.json({ status: false, message: 'New Url is Already in Redirection' })
		}
		var data = { DBName: Redirections, Data: { Newurl: req.body.Newurl, Oldurl: req.body.Oldurl } }
		var result = await Save(data)
		if (result) {
			return res.json({ status: true, message: 'Redirection Added Successfully' })
		} else {
			return res.json({ status: false, message: 'Error Occured' })
		}
	}
	catch (err) {
		console.log("addRedirect err", err);
	}
}

export async function redirectList(req, res) {
	try {
		var dataa = { DBname: Redirections, findata: {} }
		var data = await find(dataa)
		if (data) {
			return res.json({ status: true, message: 'Redirection Listed Successfully', data: { data: data, test: true } })
		}
	}
	catch (err) {
		console.log("redirectList err");
	}
}

export async function editRedirectfn(req, res) {
	try {
		var data = { DBname: Redirections, findata: { Oldurl: req.body.Oldurl } }
		var oldcheck = await find(data)
		if (oldcheck?.data?.length > 0) {
			return res.json({ status: false, message: 'Old Url is Already in Redirection' })
		}
		var data = { DBname: Redirections, findata: { Newurl: req.body.Newurl } }
		var newcheck = await find(data)
		if (newcheck?.data?.length > 0) {
			return res.json({ status: false, message: 'New Url is Already in Redirection' })
		}
		var editredirection = {
			Newurl: req.body.Newurl,
			Oldurl: req.body.Oldurl
		}
		var data = { DBName: Redirections, finData: { _id: req.body._id }, updata: { $set: editredirection }, save: { new: true } }
		var data = await FindOneAndUpdate(data)
		if (data) {
			return res.json({ status: true, message: "Updated Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("editRedirectfn err", err);
	}
}

export async function redirectDelete(req, res) {
	try {
		var data = { DBName: Redirections, FinData: { _id: req.body._id } }
		var deletedata = await FindOneAndRemove(data)
		if (deletedata) {
			return res.json({ status: true, message: "Deleted Successfully" })
		} else {
			return res.json({ status: false, message: "Error Occured" })
		}
	}
	catch (err) {
		console.log("redirectDelete err");
	}
}