const Slider = require("../models/slider");

exports.getAddSlider = (req, res, next) => {
  Slider.find()
    .then((products) => {
      res.render("admin/slider", {
        pageTitle: "Home",
        path: "/",
        prods: products,
        editing:false
      });
    })
    .catch((err) => next(err));
};
exports.postAddSlider = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const shop = req.body.shop;
  //   const  imageUrl = req.body.imageUrl;
  const uploadPath = process.env.UPLOAD_PATH || "http://localhost:3000";
  const imageUrl = `${uploadPath}/images/${req.file.originalname}`;
  const slider = new Slider({
    title: title,
    description: description,
    shop: shop,
    imageUrl: imageUrl,
  });
  slider
  .save()
    .then((result) => {
      console.log(result);

      console.log("đã chạy tới đây");
      console.log("Created Product");
      res.redirect("/admin/list-slider");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getEditSlider = (req, res, next) => {
  const editMode = req.query.edit;
  console.log("editMode:", editMode);

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Slider.findById(prodId )
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/slider", {
        pageTitle: "Home",
        editing: editMode,
        path: "admin/edit-slider",
        product: product,
      });
    })
    .catch((err) => next(err));
};
exports.getListSlider = (req, res, next) => {
  Slider.find()
    .then((products) => {
      res.render("admin/list-slider", {
        pageTitle: "Home",
        path: "/",
        prods: products,
      });
    })
    .catch((err) => next(err));
};