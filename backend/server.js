const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
// const multer= require("multer")
const bodyParser = require('body-parser')
const { Console } = require('console')
import  frontapi  from  "./routes/frontapi";
import  api  from  "./routes/api";
import {blog} from './controllers/frontapis' 
const keys = require ('./config/key')
// const keys  = require('./config/keys');
const cookieParser = require('cookie-parser')
var ip = require('ip');
var myip = ip.address();
var fs = require('fs');
const https = require('https');
const robots = require('express-robots-txt');
var http =require('http');
const compression = require('compression');
const fileupload = require("express-fileupload")
// var toastr = require('toastr')
var cors = require('cors')
const app = express()

 
app.use(cors())

mongoose.connect(keys.mongoURI, { 
  useNewUrlParser: true,
   useUnifiedTopology: true,
    //  useFindAndModify: false 
     })
const db = mongoose.connection


db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database Connection Successfully!')
})


 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
// app.get("/", express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(fileupload());
  app.use(express.static(path.join(__dirname, './public/')));


app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(compression());

const PORT = process.env.PORT || keys.port;

app.get('/test',async function(req, res){
res.send('test')
});

app.use(robots([
  {
    UserAgent: '*',
    Disallow: '/admin/controller',
    Sitemap: 'https://nounq.com/sitemap.xml'
  }
]));
app.use('/', frontapi);
app.use('/admin', api);
if (myip == '172.31.4.143') {
const options = {
key: fs.readFileSync('/var/www/ssl/nounq_com.key'),
cert: fs.readFileSync('/var/www/ssl/nounq_com.crt'),
ca: fs.readFileSync('/var/www/ssl/nounq_com.ca-bundle'),
requestCert: false
};
var server = https.createServer(options, app);
} else {
var server = http.createServer(app);
}

server.listen(PORT, () => {
  console.log("Port Running on "+PORT)
})

 






// const storage = multer.diskStorage({
//     destination: "./public/images/",
//     filename: function(req, file, cb){
//        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
//     }
//  });
 
//  const upload = multer({
//     storage: storage
//  }).single("photo")







