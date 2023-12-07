import React from 'react';
import MetaTags from 'react-meta-tags'
import { Helmet } from "react-helmet";
// import config from '../config/config';

function Meta(props) {

    return (
        <div>
            {console.log("propshii", props?.metdata?.page)}
            {props?.metdata &&
                <Helmet>
                   
                    <title>{props?.metdata?.metatitle}</title>
                    <meta name='title' content={props?.metdata?.metatitle}  />
                    <meta name='description' content={props?.metdata?.metadescription} />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={props?.metdata?.metatitle}  />
                    <meta property="og:description" content={props?.metdata?.metadescription} />
                    <meta property="og:url" content={props?.metdata?.page} />
        
                    {props?.metdata?.ogimage ? <meta property="og:image" content={`https://api.nounq.com/admin/images/ogimage/${props?.metdata?.ogimage}`} /> : (props?.metdata?.image && <meta property="og:image" content={`https://api.nounq.com/admin/images/blog/${props?.metdata?.image}`} />)}
                    <meta property="fb:app_id" content="3690687254328825" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:description" content={props?.metdata?.metadescription} />
                    <meta name="twitter:title" content={props?.metdata?.metatitle}  />
                    <meta name="twitter:site" content="@NounqTech" />
            
                    {props?.metdata?.ogimage ? <meta name="twitter:image" content={`https://api.nounq.com/admin/images/ogimage/${props?.metdata?.ogimage}`} /> : (props?.metdata?.image && <meta name="twitter:image" content={`https://api.nounq.com/admin/images/blog/${props?.metdata?.image}`} />)}
                    <meta name="twitter:creator" content="@NounqTech" />
                    <link rel="canonical" href={props?.metdata?.page} />
                    </Helmet>}
        </div>
    );
}

export default Meta;



