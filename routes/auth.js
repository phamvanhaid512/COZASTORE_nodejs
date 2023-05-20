const express = require("express");

const authController = require("../controllers/auth");
const router = express.Router();
const User = require("../models/user");
const { check, body } = require("express-validator/check");

router.get("/admin/login", authController.getLogin);

router.post("/admin/login", authController.postLogin);
router.get("/admin/signup", authController.getSignUp);

router.post(
  "/admin/signup",
  [
    check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) => {
      // if (value === 'test@test.com') {
      //   throw new Error('This email address if forbidden.');
      // }
      // return true;
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject(
            'E-Mail exists already, please pick a different one.'
          );
        }
      });
    }),
    body(
      "password",
      "Please enter a  password with only number and text and  at leaster 5 charater"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match");
      }
      return true;
    }),
  ],
  authController.postSignUp
);

router.post("/admin/logout", authController.postLogout);
router.get("/admin/reset", authController.getReset);
router.post("/admin/reset", authController.postReset);
router.get("/admin/reset/:token", authController.getNewPassword);
router.post("/admin/new-password", authController.postNewPassword);
module.exports = router;
