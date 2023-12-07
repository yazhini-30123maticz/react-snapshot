import axios from 'axios';
import config from '../config/config'


var Token =  localStorage.getItem("token")

export const tokenupdate = async () => {
     Token =  localStorage.getItem("token")
}

export const login = async (data) => {
    var senddata = {
        'method': 'post',
        'url': `${config.BACK_URL}/login`,
        data: data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp = await axiosFunc(senddata);
    return Resp?.data;
}

export const blogcategoryfind = async (data) => {
    var senddata = {
        'method': 'get',
        'url': `${config.BACK_URL}/blogcategoryfind`,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp = await axiosFunc(senddata);
    return Resp?.data;
}

export const addblogsave = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/add-blog`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const bloglist = async () => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/blog-list`,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const editblog = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/edit-blog`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const count = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/blog-trending`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const listblog = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/listing-blog`,
        params    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const deletefn = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/blog-delete`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const addblogcategory = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/add-blog-category`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const blogcategorylist = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/blog_category`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const Status = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/blog-category-change-status`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const editblogcategory = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/edit-blog-category`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
      
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const contactlist = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/contact_us`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const requestlist = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/request-quote`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const newsletterlist = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/newsletter`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const addsitemaps = async (data) => {
    var senddata    =   {
        method  :   'post',
        url     :   `${config.BACK_URL}/add-sitemap`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const listsitemap = async (data) => {
    var senddata    =   {
        method  :   'get',
        url     :   `${config.BACK_URL}/sitemap-list`,
        data    :   data,
        'headers': {
            'Authorization': Token
          }
    }
    let Resp    =   await axiosFunc(senddata)
    return Resp.data
}

export const sitemapedit = async (data) => {
        var senddata    =   {
            method  :   'post',
            url     :   `${config.BACK_URL}/edit-sitemap`,
            data    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const deletesitemap = async (data) => {
        var senddata    =   {
            method  :   'post',
            url     :   `${config.BACK_URL}/sitemap-delete`,
            data    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const addmetadata = async (data) => {
        var senddata    =   {
            method  :   'post',
            url     :   `${config.BACK_URL}/add-meta-tags`,
            data    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const metadatalist = async () => {
        var senddata    =   {
            method  :   'get',
            url     :   `${config.BACK_URL}/meta_tags`,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const editmetadata = async (data) => {
        var senddata    =   {
            method  :   'post',
            url     :   `${config.BACK_URL}/edit-meta-tags`,
            data    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const addmetachild = async (data) => {
        var senddata    =   {
            method  :   'post',
            url     :   `${config.BACK_URL}/add-meta-tags-child`,
            data    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const metachildlist = async (data) => {
        var senddata    =   {
            method  :   'get',
            url     :   `${config.BACK_URL}/meta_tags-child`,
            params    :   data,
            'headers': {
                'Authorization': Token
              }
        }
        let Resp    =   await axiosFunc(senddata)
        return Resp.data
    }

    export const editmetachild = async (data) => {
            var senddata    =   {
                method  :   'post',
                url     :   `${config.BACK_URL}/edit-meta-tags-child`,
                data    :   data,
                'headers': {
                    'Authorization': Token
                  }
            }
            let Resp    =   await axiosFunc(senddata)
            return Resp.data
        }

        export const addredirection = async (data) => {
            var senddata    =   {
                method  :   'post',
                url     :   `${config.BACK_URL}/add-redirect`,
                data    :   data,
                'headers': {
                    'Authorization': Token
                  }
            }
            let Resp    =   await axiosFunc(senddata)
            return Resp.data
        }

        export const listredirect = async (data) => {
            var senddata    =   {
                method  :   'get',
                url     :   `${config.BACK_URL}/redirect-list`,
                data    :   data,
                'headers': {
                    'Authorization': Token
                  }
            }
            let Resp    =   await axiosFunc(senddata)
            return Resp.data
        }

        export const editredirections = async (data) => {
                var senddata    =   {
                    method  :   'post',
                    url     :   `${config.BACK_URL}/edit-redirect`,
                    data    :   data,
                    'headers': {
                        'Authorization': Token
                      }
                }
                let Resp    =   await axiosFunc(senddata)
                return Resp.data
            }

            export const deleteredirection = async (data) => {
                var senddata    =   {
                    method  :   'post',
                    url     :   `${config.BACK_URL}/redirect-delete`,
                    data    :   data,
                    'headers': {
                        'Authorization': Token
                      }
                }
                let Resp    =   await axiosFunc(senddata)
                return Resp.data
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


