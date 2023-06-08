const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if(req.session.num === undefined){
      req.session.num = 1;
  } else {
      req.session.num =  req.session.num + 1;
      if (req.session.num > 5) req.session.num = 0;
  }
  res.send(`Views : ${req.session.num}`);
});

module.exports = router;
