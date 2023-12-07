



import { lazy } from "react";

const Routes = [
 
    {
        path: "/admin/login",
        component: lazy(() => import('./user-pages/Login')),
        name:'/admin'
    
    },
    {
        path: "/user-pages/register",
        component: lazy(() => import('./user-pages/Register')),
        name: '/admin'
    },
    {
        path: "/error-pages/error-404",
        component: lazy(() => import('./error-pages/Error404')),
        name: '/admin'
    },
    {
        path: "/error-pages/error-500",
        component: lazy(() => import('./error-pages/Error500')),
        name: '/admin'
    },
    {
        path: "/dashboard",
        component: lazy(() => import('./dashboard/Dashboard')),
        name: '/admin'
    },
    {
        path: "/basic-ui/buttons",
        component: lazy(() => import('./basic-ui/Buttons')),
        name: '/admin'
    },
    {
        path: "/basic-ui/dropdowns",
        component: lazy(() => import('./basic-ui/Dropdowns')),
        name: '/admin'
    },
    {
        path: "/basic-ui/typography",
        component: lazy(() => import('./basic-ui/Typography')),
        name: '/admin'
    },
    {
        path: "/form-Elements/basic-elements",
        component: lazy(() => import('./form-elements/BasicElements')),
        name: '/admin'
    },
    {
        path: "/tables/basic-table",
        component: lazy(() => import('./tables/BasicTable')),
        name: '/admin'
    },
    {
        path: "/icons/mdi",
        component: lazy(() => import('./icons/Mdi')),
        name: '/admin'
    },
    {
        path: "/charts/chart-js",
        component: lazy(() => import('./charts/ChartJs')),
        name: '/admin'
    },
    {
        path: "/pages/blog",
        component: lazy(() => import('../pages/blog')),
        name: '/admin'
    },
    {
        path: "/pages/addblog",
        component: lazy(() => import('../pages/addblog')),
        name: '/admin'
    },
    {
        path: "/pages/editblog",
        component: lazy(() => import('../pages/editblog')),
        name: '/admin'
    },
    {
        path: "/pages/blogcategory",
        component: lazy(() => import('../pages/blogcategory')),
        name: '/admin'
    },
    {
        path: "/pages/addblogcategory",
        component: lazy(() => import('../pages/addblogcategory')),
        name: '/admin'
    },
    {
        path: "/pages/editblogcategory",
        component: lazy(() => import('../pages/editblogcategory')),
        name: '/admin'
    },
    {
        path: "/pages/FAQgen",
        component: lazy(() => import('../pages/FAQgen')),
        name: '/admin'
    },
    {
        path: "/pages/contact",
        component: lazy(() => import('../pages/contact')),
        name: '/admin'
    },
    
    {
        path: "/pages/contactdetails",
        component: lazy(() => import('../pages/contactdetails')),
        name: '/admin'
    },
    {
        path:"/pages/requestquotes",
        component: lazy(() => import('../pages/requestquotes')),
        name:'/admin'
    },
    {
        path:"/pages/requestdetails",
        component: lazy(() => import('../pages/requestdetails')),
        name:'/admin'
    },
    {
        path:"/pages/newsletter",
        component: lazy(() => import('../pages/newsletter')),
        name:'/admin'
    },
    {
        path: "/pages/sitemap",
        component: lazy(() => import('../pages/sitemap')),
        name: '/admin'
    },
    {
        path: "/pages/addsitemap",
        component: lazy(() => import('../pages/addsitemap')),
        name: '/admin'
    },
    {
        path:"/pages/editsitemap",
        component:lazy(()=>import('../pages/editsitemap')),
        name:'/admin'
    },
    {
        path:"/pages/metadata",
        component:lazy(()=>import('../pages/metadata')),
        name:'/admin'
    },
    {
        path:"/pages/addmetadata",
        component:lazy(()=>import('../pages/addmetadata')),
        name:'/admin'
    },
    {
        path:"/pages/editmetadata",
        component:lazy(()=>import('../pages/editmetadata')),
        name:'/admin'
    },
    {
        path:"/pages/metachild",
        component:lazy(()=>import('../pages/metachild')),
        name:'/admin'
    },
    {
        path:"/pages/addmetachild",
        component:lazy(()=>import('../pages/addmetachild')),
        name:'/admin'
    },
    {
        path:"/pages/editmetachild",
        component:lazy(()=>import('../pages/editmetachild')),
        name:'/admin'
    },
    {
        path:"/pages/redirection",
        component:lazy(()=>import('../pages/redirection')),
        name:'/admin'
    },
    {
        path:"/pages/addredirection",
        component:lazy(()=>import('../pages/addredirection')),
        name:'/admin'
    },
    {
        path:"/pages/editredirection",
        component:lazy(()=>import('../pages/editredirection')),
        name:'/admin'
    }
    
]


export default Routes;

