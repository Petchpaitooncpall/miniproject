var express = require('express');
const mysql = require("mysql2/promise");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { update } = require('tar');
var router = express.Router();

var app = express();

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

app.use(session({
  secret: "primo",
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 600000 } // session timeout of 60 seconds
}));

const dbConn = mysql.createConnection({
  host: 'localhost',
  user: 'root', // <== ระบุให้ถูกต้อง
  password: '123456789',  // <== ระบุให้ถูกต้อง
  database: 'seller_register',
  port: '9900'  // <== ใส่ port ให้ถูกต้อง (default 3306, MAMP ใช้ 8889)
});


/* GET home page. */
router.get('/', function(req, res, next) {
  // req.session.destroy();
  res.render('index', { title: 'Login Seller' , status: 0});
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Login Seller' , status: 0});
});

router.get('/dashboard', async (req, res, next) => {

  const sessionData = req.session;

  let txt_login = "";
  let list_product = [];
  let status_code = 0;

  if(sessionData)
  {
    console.log(sessionData);
    txt_login = sessionData.username;
  }

  console.log(txt_login);
  if(txt_login)
  {
    const connection = await dbConn;
    const rows = await connection.query("SELECT *, DATE_FORMAT(update_date,'%d-%m-%Y') AS update_date FROM product");
  
    let num = (await rows)[0].length;
    console.log(num);

    if(num > 0)
    {
      list_product = rows[0];
      status_code = 1;
    }
    res.render('dashboard', { title: 'Dashboard'  , txt_log: 'Dashboard' , txt_login: txt_login , 'product_detail' : list_product , 'status_code': status_code});
  }
  else
  {
    res.redirect("/")
  }
});

router.get('/products', function(req, res, next) {
  res.render('products', { title: 'Product' , txt_pro: 'หน้าเพิ่มสินค้า' , status_code: 0});
});

router.get('/register', function(req, res, next) {

  var status_code = 0;
  res.render('register', { title: 'Register' , txt_reg: 'ลงทะเบียนผู้ขาย'  , status: status_code});
});

router.post('/register', async (req, res, next) => {

  console.log(req.body);
  var username = req.body.username;
  var password = req.body.password;
  var name = req.body.name;
  var surname = req.body.surname;
  var address = req.body.address;
  var email = req.body.email;
  var tel = req.body.tel;

  status_code = 2;

  if(username != '' && password != '' && name != '' && surname != '' && address != '' && email && tel != '' != '')
  {
    const connection = await dbConn;
    const insert_data = connection.query("INSERT INTO member (username, password, name, surname,address, email, tel) VALUES ('" + username + "' , '" + password + "' , '" + name + "' , '" + surname + "' , '" + address + "' , '" + email + "' , '" + tel + "')");
    
      let num = (await insert_data)[0]['affectedRows'];
    
      if(num > 0)
      {
        status_code = 1;
      }
  }

  res.render('register', { title: 'Register' , txt_reg: 'ลงทะเบียนผู้ขาย' , status: status_code});
});

router.post('/login', async (req, res, next) => {

  let username = req.body.username;
  let password = req.body.password;

  const connection = await dbConn;
  const rows = await connection.query("SELECT * FROM member WHERE username = '" + username +  "' and password = '" + password +  "' ");

  let num = (await rows)[0].length;
  console.log(num);
    
  if(num == 0)
  {
    status_code = 1;
    res.render('index', { title: 'Login Seller' , status: status_code});
  }
  else
  {
    req.session.username = username;
    req.session.password = password;
    req.session.save();

    console.log(req.session);
    res.redirect('/dashboard');
  }
});

router.post('/product', async (req, res, next) => {

  let product_id = req.body.product_id;
  let product_name = req.body.product_name;
  let product_price = req.body.product_price;
  
  let status_code = 2;

  let d = new Date();
  d.setDate(d.getDate() - 1);
  d.setMonth(d.getMonth() - 2);
  var cur_date = d.getDate();
  var cur_month = d.getMonth();

  cur_month = parseInt(cur_month + 1);

  var cur_year = d.getFullYear();
  var dmy = cur_year + "-" + cur_month + "-" + cur_date;
  
  let update_date = dmy

  if(product_id != '' && product_name != '' && product_price != '' )
  {
    const connection = await dbConn;
    const insert_data = connection.query("INSERT INTO product (product_id, product_name, price, update_date) VALUES ('" + product_id + "' , '" + product_name + "' , '" + product_price + "' , '" + update_date + "')");
    
      let num = (await insert_data)[0]['affectedRows'];
    
      if(num > 0)
      {
        status_code = 1;
      }
  }

  res.render('products', { title: 'Product' , txt_pro: 'หน้าเพิ่มสินค้า' , status_code: status_code});
});

router.post('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
