const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("ejs")
  res.render('index.ejs', { title: 'Expresss' });
});

module.exports = router;
