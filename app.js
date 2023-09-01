const express = require('express');
const ejs = require('ejs');
const dotenv = require('dotenv');
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const mail = require('./modules/email');
const request = require('request');
const session = require('express-session');
const flash = require('connect-flash');
// Load environment variables
dotenv.config();
app.use(morgan("dev"));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
// Set view engine
app.set('view engine', 'ejs');

// Set up public folder
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));


async function getData(link, single = false) {
  //This data will be sent to the server with the POST request.

  const options = {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + process.env.STRAPI_KEY }
  }
  let url
  if (single) {
    url = process.env.STRAPI_URL + link +'&populate=deep';
    try {
      const response = await fetch(url, options)
      const jsonResponse = await response.json();
      return jsonResponse.data[0];
    } catch(err) {
      console.log('ERROR', err);
    }
  }else{
    url = process.env.STRAPI_URL + link +'?populate=deep';
    try {
      const response = await fetch(url, options)
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch(err) {
      console.log('ERROR', err);
    }
  }
 

  
}



// Define app.get route for home page
app.get('/', (req, res) => {
  getData("/home").then((data)=>{
    res.render('home', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/'});
  })
});
app.get('/about', (req, res) => {
  //send a get request to the api on localhost:1337 with token in header with fetch
  getData("/about").then((data)=>{
    res.render('about', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/about'});
  })
});
app.get('/work', (req, res) => {
  getData("/all-works-page").then((data)=>{
    getData("/works").then((data2)=>{
      res.render('work', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data,worksData:data2, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/work'});
    })
  })
})
app.get('/work/:slug', (req, res) => {
  let strapiURLTO = '/works?filters[slug][$eq]='+req.params.slug
  getData(strapiURLTO, single=true).then((data)=>{
    console.log(data);
    res.render('work-detail', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:"/work/"+req.params.slug});
  })
})
app.post('/contact', (req, res) => {

  let data = {name: req.body.name , email: req.body.email, query: req.body.query, phone: req.body.phone};
  if(req.body.recaptcha_token === undefined || req.body.recaptcha_token === '' || req.body.recaptcha_token === null)
    {
            req.flash('resCode', '402');
            req.flash('resMessage', 'Failed Captcha Verification Server Side Issue Please Contact Developer(Error code - 402)');
            // await sleep(500);
            res.redirect("back");
    }
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    var g = req.body.recaptcha_token;
    // console.log(req.body["g-recaptcha-response"]);
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + g;
  
    request(verificationURL,function(error,response,body) {
      body = JSON.parse(body);
        console.log(body);
      if(body.success == undefined || body.success== false || body.score < 0.5) {
            req.flash('resCode', '403');
            req.flash('resMessage', 'Failed Captcha Verification Please Retry.(Error code - 403)');
            res.redirect("back");
      
      } else{
        mail(data).catch(function(e){
          console.log(e);
            req.flash('resCode', '401');
            req.flash('resMessage', 'SMTP Error contact Developer.(Error code - 401)');
            res.redirect("back");
        })
        req.flash('resCode', '200');
        req.flash('resMessage', 'Query Generated Successfully!!! Our Executive will contact you soon.');
        res.redirect("back");
      }
    });
})
// Start the server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
