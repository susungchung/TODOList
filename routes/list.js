var express = require('express');
router = express.Router();

/* GET list page. */
router.get('/', function(req, res, next) {
    res.send('listpage');
});


module.exports = router;