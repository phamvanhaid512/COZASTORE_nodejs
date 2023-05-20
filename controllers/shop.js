const Product = require("../models/product");
// const User = require("../models/users");
const Order = require("../models/order");

exports.getIndex = (req, res, next) => {
  console.log("populate", req.session.user);
  console.log("chaydendayroi", req.session.isLoggedIn);

  if (req.session.isLoggedIn) {
    console.log("chaydendayroi", req.session.isLoggedIn);
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        Product.find().then((allProduct) => {
          return  res.render("shop/index", {
            path: "/",
            prods: allProduct,
            products: products,
            isAuthenticated: req.session.isLoggedIn,
            // csrfToken:req.csrfToken()
          });
        });
      })
      .catch((err) => next(err));
  } else {
    Product.find()
      .then((allProduct) => {
        return   res.render("shop/index", {
          path: "/",
          prods: allProduct,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
};
exports.getProducts = (req, res, next) => {
  console.log("populate", req.session.user);
  console.log("chaydendayroi", req.session.isLoggedIn);

  if (req.session.isLoggedIn) {
    console.log("chaydendayroi", req.session.isLoggedIn);
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        Product.find().then((allProduct) => {
          return    res.render("shop/product", {
            path: "/",
            prods: allProduct,
            products: products,
            isAuthenticated: req.session.isLoggedIn
           
          });
        });
      })
      .catch((err) => next(err));
  } else {
    Product.find()
      .then((allProduct) => {
        return    res.render("shop/product", {
          path: "/product",
          prods: allProduct,
          isAuthenticated: req.session.isLoggedIn
         
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
};

// exports.getDetailProduct= (req, res, next) => {
// const prodId = req.params.productId;
// Product.findById(prodId)
// console.log('Chay dên dây rôi')
// .then((product) => {
//   res.render('shop/product-detail', {
//     product: product,
//     pageTitle: product.title,
//     path: '/product-detail'
//   });
// })
// .catch(err => console.log(err));

// };
exports.getDetailProduct = (req, res, next) => {
  if (req.session.isLoggedIn) {
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        const prodId = req.params.productId;
        Product.findById(prodId).then((allProduct) => {
          console.log(allProduct);
          console.log("Chay dên dây rôi");
          return    res.render("shop/product-detail", {
            product: allProduct,
            products: products,
            pageTitle: allProduct.name,
            path: "/product-detail",
            isAuthenticated: req.session.isLoggedIn
       
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    const prodId = req.params.productId;
    Product.findById(prodId)
      .then((allProduct) => {
        console.log(allProduct);
        console.log("Chay dên dây rôi");
        return   res.render("shop/product-detail", {
          product: allProduct,

          pageTitle: allProduct.name,
          path: "/product-detail",
          isAuthenticated: req.session.isLoggedIn
  
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// exports.getDetailProduct = (req, res, next) => {
//   const prodId = req.params.productId;
//   console.log('Chay dên dây rôi')
//   Product.findById(prodId, (err, product) => {
//     if (err || !product) {
//       console.log(err);
//       return res.redirect('/');
//     }
//     res.render('shop/product-detail', {
//       product: product,
//       pageTitle: product.title,
//       path: '/product-detail'
//     });
//   });
// };

exports.getContact = (req, res, next) => {
  if (req.session.isLoggedIn) {
    console.log("chaydendayroi", req.session.isLoggedIn);
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        Product.find().then((allProduct) => {
          return   res.render("shop/contact", {
            path: "/contact",
            prods: allProduct,
            products: products,
            isAuthenticated: req.session.isLoggedIn
         
          });
        });
      })
      .catch((err) => next(err));
  } else {
    Product.find()
      .then((allProduct) => {
        return  res.render("shop/contact", {
          path: "/contact",
          prods: allProduct,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
};
exports.getBlog = (req, res, next) => {
  if (req.session.isLoggedIn) {
    console.log("chaydendayroi", req.session.isLoggedIn);
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        Product.find().then((allProduct) => {
          res.render("shop/blog", {
            path: "/blog",
            prods: allProduct,
            products: products,
           
          });
        });
      })
      .catch((err) => next(err));
  } else {
    Product.find()
      .then((allProduct) => {
        return   res.render("shop/blog", {
          path: "/blog",
          prods: allProduct,
          // isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
};
exports.getAbout = (req, res, next) => {
  if (req.session.isLoggedIn) {
    console.log("chaydendayroi", req.session.isLoggedIn);
    req.user
      .populate("cart.items.productId")
      .execPopulate()
      .then((user) => {
        const products = user.cart.items;
        Product.find().then((allProduct) => {
          return     res.render("shop/about", {
            path: "/about",
            prods: allProduct,
            products: products,
            isAuthenticated: req.session.isLoggedIn,
          });
        });
      })
      .catch((err) => next(err));
  } else {
    Product.find()
      .then((allProduct) => {
        return   res.render("shop/about", {
          path: "/about",
          prods: allProduct,
          isAuthenticated: req.session.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
};

exports.getCart = (req, res, next) => {
  if (!req.user) {
    return res.redirect("/");
  }
  console.log(req.user);
  console.log("loigi");
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        isAuthenticated: req.session.isLoggedIn
     
      });
    })
    .catch((err) => console.log(err));
};
exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      console.log(result);
      res.redirect("/cart");
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log("Chạy dến đây rồi");
  req.user
    .removeFromCart(prodId)
    .then((result) => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartOrder = (req, res, next) => {
  console.log("order");
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items.map((i) => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
   email: req.user.email,
          userId: req.user,
        },
        products: products,
      });
      return order.save();
    })
    .then((result) => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.log(err));
};

exports.getCartOrder = (req, res, next) => {
  console.log("Chay đến đay rồi");
  req.user
    .populate("cart.items.productId")
    .execPopulate()
    .then((user) => {
      const products = user.cart.items;

      Order.find({ "user.userId": req.user._id }).then((orders) => {
        res.render("shop/orders", {
          path: "/orders",
          pageTitle: "Your Orders",
          products: products,
          orders: orders,
          isAuthenticated: req.session.isLoggedIn
        
        });
      });
    });
};
