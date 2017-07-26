var express = require('express');
var bcrypt = require('bcrypt');
var tokenGenerator = require('../config/auth/jwtGenerator');
var users = require('../db/controllers/users')
var router  = express.Router();

router.post('/', function(req, res) {
  var reqEmail = req.body.email;
  var reqPassword = req.body.password;
  console.log('email is ', reqEmail);
  console.log('password is ', reqPassword);

  if (reqEmail && reqPassword) {
    var user = users.getUserByEmail(reqEmail)
    .then(function(user){
      if (!user) {
        console.log('user not found')
        res.status(401).json({ message: "invalid username or password" });
      }

      if (bcrypt.compare(reqPassword, user.password)) {
        console.log('password match');
        var token = tokenGenerator(user.id);
        res.json({
          message: "login successful",
          token: token,
        });
      } else {
        console.log('password no match');
        res.status(401).json({ message: "invalid username or password" });
      }
    })
    .catch(function(err) {
      console.log('this is authentication db error', err);
    });
  }
});

module.exports = router;
