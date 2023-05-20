const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const moongose = require("mongoose");
const User = require("./models/user");
//phần đăng nhập session
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
// const csrf = require('csurf');
const flash = require('connect-flash');
const errorController = require("./controllers/error");

const MONGODB_URI = "mongodb://127.0.0.1:27017/web_shop";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
// const csrfProtection = csrf();
const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");

const shopRoutes = require("./routes/shop");
const sliderRoutes = require("./routes/slider");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);
// app.use(csrfProtection);
app.use(flash()); 
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});
// app.use((req,res,next ) => {
// res.locals.isAuthenticated = req.session.isLoggedIn;
// res.locals.csrfToken  = req.csrfToken();
// next();
// });
app.use("/admin", adminRoutes);
app.use(authRoutes);

app.use(shopRoutes);
app.use("/admin", sliderRoutes);

app.use(errorController.get404);
// app.listen(3000, () => {
//     console.log('Ứng dụng đang chạy trên cổng 3000');
//   });

moongose
  .connect(MONGODB_URI)
  .then((result) => {
    // User.findOne().then((user) => {
    //   if (!user) {
    //     const user = new User({
    //       name: "Max",
    //       email: "max@test.com",
    //       cart: {
    //         items: [],
    //       },
    //     });
    //     user.save();
    //   }
    // });
    app.listen(3000);

    // next();
  })
  .catch((err) => console.log(err));
console.log("Ứng dụng đang chạy trên cổng 3000");
console.log("jet noi dât base thanh cong");
