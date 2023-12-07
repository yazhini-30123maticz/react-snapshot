import express from 'express'
import { verifyToken } from '../verify/verify';
const router = express.Router();
import {loginn,blogcategoryfind,addblog,newsletter,contact,sitemapList,addSitemapfn,sitemapDelete,editSitemapfn,requestQuote,blogList,editBlogs,blogTrending,listingblog,blogDelete,addBlogCategory,blogCategory,editBlogCategory,blogCategoryChangeStatus,addMetaTags,metaTagss,editMetaTags,addMetaTagsChild,metatagschild,editMetaTagsChild,addRedirectfn,redirectList,editRedirectfn,redirectDelete} from '../controllers/apis'

router.route('/login').post(loginn)
router.route('/contact_us').get(verifyToken,contact)
router.route('/request-quote').get(verifyToken,requestQuote)
router.route('/newsletter').get(verifyToken,newsletter)
router.route('/add-sitemap').post(verifyToken,addSitemapfn)
router.route('/sitemap-list').get(verifyToken,sitemapList)
router.route('/edit-sitemap').post(verifyToken,editSitemapfn)
router.route('/sitemap-delete').post(verifyToken,sitemapDelete)
router.route('/blogcategoryfind').get(verifyToken,blogcategoryfind)
router.route('/add-blog').post(verifyToken,addblog)
router.route('/blog-list').get(verifyToken,blogList)
router.route('/blog-trending').post(verifyToken,blogTrending)
router.route('/edit-blog').post(verifyToken,editBlogs)
router.route('/listing-blog').get(verifyToken,listingblog)
router.route('/listing-blog').get(verifyToken,listingblog)
router.route('/blog-delete').post(verifyToken,blogDelete)
router.route('/add-blog-category').post(verifyToken,addBlogCategory)
router.route('/blog_category').get(verifyToken,blogCategory)
router.route('/edit-blog-category').post(verifyToken,editBlogCategory)
router.route('/blog-category-change-status').post(verifyToken,blogCategoryChangeStatus)
router.route('/meta_tags').get(metaTagss)
router.route('/add-meta-tags').post(addMetaTags)
router.route('/edit-meta-tags').post(editMetaTags)
router.route('/add-meta-tags-child').post(addMetaTagsChild)
router.route('/meta_tags-child').get(metatagschild)
router.route('/edit-meta-tags-child').post(editMetaTagsChild)
router.route('/redirect-list').get(redirectList)
router.route('/add-redirect').post(addRedirectfn)
router.route('/edit-redirect').post(editRedirectfn)
router.route('/redirect-delete').post(redirectDelete)


export default router; 
