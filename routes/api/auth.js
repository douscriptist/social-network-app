const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require("express-validator");

const User = require('../../models/User');

// @route   GET api/auth
// @desc    Test Route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/auth
// @desc    Authenticate User & Get Token
// @access  Public
router.post("/",
  [
    check('email', 'Email is required!').isEmail(),
    check('password', 'Password is required!').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try {
      // See if user exists?
      let user = await User.findOne({ email });
      if(!user) {
        // Security ????
        return res.status(404).json({ errors: [{ msg: 'User not found!' }] })
      }

      // Match email and password
      const isMatched = await bcrypt.compare(password, user.password);
      if(!isMatched) {
        // Security ????
        return res.status(404).json({ errors: [{ msg: 'Password is wrong!' }] })
      }

      // 
      const payload = {
        user: {
          id: user.id
        }
      }

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // LATER:
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;