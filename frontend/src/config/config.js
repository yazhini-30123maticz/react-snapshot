
var EnvName = 'live';
 var key = {};

if (EnvName === "live") {
    key.FRONT_URL = 'https://nounq.com/'
    key.BACK_URL = 'https://api.nounq.com'
    key.Image_URL = "https://api.nounq.com/"
    // key.BACK_URL        =   'http://192.53.121.26:3331/v1/front'
    // key.ADMIN_URL        =   'http://192.53.121.26:3331/v1/admin'
}
else if (EnvName === "demo") {
    key.FRONT_URL = 'https://staging.nounq.com/'
    key.BACK_URL = 'https://api.nounq.com'
}
else {
    key.BACK_URL = 'http://localhost:2053'
    key.Image_URL = "http://localhost:2053/"
    // key.ADMIN_URL        =   'http://192.53.121.26:3331/v1/admin'
}

export default key;