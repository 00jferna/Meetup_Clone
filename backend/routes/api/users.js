// backend/routes/api/users.js
const express = require("express");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Sequelize } = require("../../db/models");

const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage("Please provide a username with at least 4 characters."),
  check("username").not().isEmail().withMessage("Username cannot be an email."),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

// Sign up
router.post("/", validateSignup, async (req, res) => {
  const { email, firstName, lastName, password, username } = req.body;

  const currentUser = await User.findOne({
    where: {
      email,
    },
  });
  
  if (currentUser) {
    return res.status(403).json({
      message: "User already exists",
      statusCode: 403,
      errors: {
        email: "User with that email already exists",
      },
    });
  }
  const user = await User.signup({
    email,
    firstName,
    lastName,
    username,
    password,
  });

  const newUser = await User.scope("signupUser").findByPk(user.id);

  const returnToken = await setTokenCookie(res, user);

  userObj = newUser.toJSON();
  userObj.token = returnToken;

  return res.json(userObj);
});

module.exports = router;
