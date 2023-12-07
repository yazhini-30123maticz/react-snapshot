
var EnvName = 'local';
var key = {};

if(EnvName === "live") {
    key.FRONT_URL       =   'https://nounq.com/'
    key.BACK_URL = 'https://api.nounq.com/admin'
    key.Image_URL = "https://api.nounq.com/"
    // key.BACK_URL        =   'http://192.53.121.26:3331/v1/front'
    // key.ADMIN_URL        =   'http://192.53.121.26:3331/v1/admin'
}
else  {
    key.FRONT_URL       =   'https://nounq.com/'
    key.BACK_URL       =   'http://localhost:2053/admin'
    key.Image_URL = "http://localhost:2053/"
    // key.Image_URL = "http://localhost:2053/"
    // key.ADMIN_URL        =   'http://192.53.121.26:3331/v1/admin'
}


export default key;
