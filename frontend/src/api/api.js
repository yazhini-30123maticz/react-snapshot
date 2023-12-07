import axios from 'axios';
import config from '../config/config'





export const contactsave = async (data) => {

    var senddata = {
        'method': 'post',
        'url': `${config.BACK_URL}/contact-submit`,
        data: data
    }
    let Resp = await axiosFunc(senddata);
  
    return Resp?.data;
}

export const SitemapFindfn = async () => {

    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/sitemap.xml`,
    }

    let Resp    =   await axiosFunc(senddata)

    return Resp.data


}





export const requestsave = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/requestquote-submit`,
        data    :   data,
        'headers': {
            'Content-Type': 'multipart/form-data'
          }
    }
    
    let Resp    =   await axiosFunc(senddata)
 
    return Resp.data


}

export const subscribesave = async (data) => {

    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/newsletter-add`,
        data    :   data
        
    }
    
    let Resp    =   await axiosFunc(senddata)
   
    return Resp.data


}



export const categoryfind = async (data) => {

    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/categoryfind`,

    }
    let Resp = await axiosFunc(senddata);
 
    return Resp?.data;
}
export const axiosFunc = async (data) => {
    try {
        let Resp = await axios(data)
      
        return Resp
    }
    catch (e) {
        return { success: 'error', msg: null }
    }
}

export const metatag = async (data) => {

    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/getmetadata`,
        params:data
    }
    console.log("senddata",senddata);
    let Resp = await axiosFunc(senddata);
  
    return Resp?.data;
}
export const blogfind = async (data) => {

    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/blog`,

    }
    let Resp = await axiosFunc(senddata);

    return Resp?.data;
}

export const blogcategoryfind = async (data) => {
    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/category`,
        params:data
    }
    let Resp = await axiosFunc(senddata)

    return Resp?.data;
}


export const Loadmore = async (data) => {

    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/Load-new-blogs-append`,
        data    :   data
        
    }
    
    let Resp    =   await axiosFunc(senddata)
    
    return Resp.data
}

export const blogdetailfind = async (data) => {
 
    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/blogdetail`,
        params:data
    }
    let Resp = await axiosFunc(senddata)
  
    return Resp?.data;
}

export const blogLoadmore = async (data) => {

    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/blogs-load-more-append`,
        data    :   data
        
    }
    
    let Resp    =   await axiosFunc(senddata)

    return Resp.data
}