import express from 'express'
const router = express.Router();


import {home,getrequestquote,contactfn,requestquote,newsletter,sitemap,categoryfind,getmetadata,blog,category,loadmore,slug,blogloadmore} from '../controllers/frontapis'



router.route('/').get(home)
router.route('/requestquote').get(getrequestquote)
router.route('/contact-submit').post(contactfn)
router.route('/categoryfind').get(categoryfind)
router.route('/requestquote-submit').post(requestquote)
router.route('/newsletter-add').post(newsletter)
router.route('/getmetadata').get(getmetadata)
router.route('/sitemap.xml').get(sitemap)
router.route('/blog').get(blog);
router.route('/category').get(category);
router.route('/Load-new-blogs-append').post(loadmore);
router.route('/blogdetail').get(slug)
router.route('/blogs-load-more-append').post(blogloadmore)
export default router; 