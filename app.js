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


async function getData(link) {
  //This data will be sent to the server with the POST request.

  const options = {
    method: 'GET',
    headers: { 'Authorization' : 'Bearer ' + process.env.STRAPI_KEY }
  }
  let url
  
    url = process.env.STRAPI_URL + link ;
    try {
      const response = await fetch(url, options)
      const jsonResponse = await response.json();
      console.log("-----------------------------------------------------------")
      console.log(jsonResponse)
      return jsonResponse;
    } catch(err) {
      console.log('ERROR', err);
    }
  }



// Define app.get route for home page
app.get('/', (req, res) => {
  getData("home?populate=*").then((data)=>{
    getData("home?populate[SEO][populate]=*").then((data2)=>{
      getData("home?populate[works][populate]=*").then((data3)=>{
        res.render('home', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data.data,seo:data2.data,works:data3.data, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/'});
      })
    })
  })
});
app.get('/about', (req, res) => {
  //send a get request to the api on localhost:1337 with token in header with fetch
  getData("about?populate=*").then((data)=>{
    getData("about?populate[SEO][populate]=*").then((data2)=>{
      getData("about?populate[employees][populate]=*").then((data3)=>{
        getData("brands?populate=*").then((data4)=>{
          res.render('about', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data.data, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/about', seo:data2.data, employees:data3.data , brands:data4.data});
        }) 
        
      })})
    
  })
});
app.get('/work', (req, res) => {
  getData("all-works-page?populate=*").then((data)=>{
    getData("works?populate=*").then((data2)=>{
      getData("all-works-page?populate[SEO][populate]=*").then((data3)=>{
        res.render('work', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data.data ,worksData:data2, link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:'/work', seo:data3.data});
      })
    })
  })
})
app.get('/work/:slug', (req, res) => {
  let strapiURLTO = 'works?filters[slug][$eq]='+req.params.slug
  getData(strapiURLTO+'&populate[Assets][populate][image1][populate]=*&populate[Assets][populate][image2][populate]=*&populate[Assets][populate][imageBanner][populate]=*&populate[Assets][populate][videoBanner][populate]=*').then((data)=>{
    getData(strapiURLTO+'&populate[SEO][populate]=*').then((data2)=>{
    res.render('work-detail', {rescode: req.flash('resCode'), resmessage:req.flash('resMessage'), data: data.data[0], link: process.env.STRAPI_LINK, baseURL:process.env.SERVER_URL, pageURL:"/work/"+req.params.slug, seo:data2.data[0]});
  })})
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
