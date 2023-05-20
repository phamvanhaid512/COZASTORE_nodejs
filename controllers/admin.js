const Product = require("../models/product");

exports.getAddProducts = (req, res, next) => {

  res.render("admin/add-product", {
    pageTitle: "Add Product",
    path: "admin/add-product",
    editing: false,
    isAuthenticated: req.session.isLoggedIn




  });
};

exports.postAddProducts = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;
  const description = req.body.description;
  const detail = req.body.detail;
  const uploadPath = process.env.UPLOAD_PATH || "http://localhost:3000";
  const imageUrl = `${uploadPath}/images/${req.file.originalname}`;
  // const imageUrl  =req.body.imageUrl;
  const product = new Product({
    name: name,
    price: price,
    description: description,
    detail: detail,
    imageUrl: imageUrl,
    userId: req.user,
    isAuthenticated: req.session.isLoggedIn


  });
  product
    .save()
    .then((result) => {
      console.log(result);

      console.log("đã chạy tới đây");
      console.log("Created Product");
      res.redirect("/admin/list-product");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getListProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      res.render("admin/list-product", {
        pageTitle: "List Product",
        path: "admin/list-product",
        prods: products
,
isAuthenticated: false


      });
    })
    .catch((err) => next(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  console.log("editMode:", editMode);

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  // console.log('prodId:', prodId);

  console.log("update");

  Product.findById(prodId)
    .then((product) => {
      // if (product.userId !== req.user._id) {
      //   return res.redirect("/");
      // }
      res.render("admin/add-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
        isAuthenticated: false


      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;
  const updatedDetail = req.body.detail;
  const uploadPath = process.env.UPLOAD_PATH || "http://localhost:3000";
  const updatedImageUrl = `${uploadPath}/images/${req.file.originalname}`;

  // const updatedImageUrl = req.file ? req.file.path : null; // lấy đường dẫn tới file hình ảnh
  if (updatedDetail == null) {
    console.log("khác null");
  }
  Product.findById(prodId)
    .then((product) => {
      if (product.userId.toString() !== req.user._id.toString()) {
        return res.redirect('/');
      }
      product.name = updatedName;
      product.price = updatedPrice;
      product.description = updatedDescription;
      product.detail = updatedDetail;
      if (updatedImageUrl) {
        product.imageUrl = updatedImageUrl;
      }
      return product.save() .then((result) => {
        console.log(result);
  
        console.log("UPDATED PRODUCT!");
        res.redirect("/admin/list-product");
      });
    })
   
    .catch((err) => console.log(err));

};

exports.postDeleteProduct = (req, res, next) => {
  console.log('delete');
  const prodId = req.body.productId;
  Product.deleteOne({ _id: prodId, userId: req.user._id })
    .then(() => {
      console.log('DESTROYED PRODUCT');
      res.redirect('/admin/list-product');
    })
    .catch(err => console.log(err));
};
