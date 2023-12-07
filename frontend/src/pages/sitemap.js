import XMLViewer from 'react-xml-viewer'
import { isEmpty } from '../config/common';
import React, { useState, useEffect } from 'react';
import { SitemapFindfn } from '../api/api'


function Sitemap() {
  const [sitemap, setSitemap] = useState([])


  useEffect(() => {
    sitefn();
  }, [])

  const sitefn = async () => {
    var sitefind = await SitemapFindfn()
    if (sitemap) {
      // var pathname = "./public/sitemap/"
      // var filename= "sitemap.xml"
      // fs.mkdir(pathname, { recursive: true }, function (err, data) {
      //   if (err) {
      //     console.log("err",err);
      //     return false;
      //   }
      //   fs.writeFile(
      //     `${pathname}/${filename}`,
      //     `${sitemap}`,
      //     async function (err, data) {
      //       if (err){
      //         console.log("err",err,data)
      //         return err;
      //        } 
      //     }
      //   );
      // });
      // console.log("xml",sitemap);

    }
  }








    




  return (
    <>
      {isEmpty(sitemap) === true ? <></> : <XMLViewer xml={sitemap} />}
    </>
  )
}

export default Sitemap;




