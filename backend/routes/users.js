const express = require('express');
const db =  require('../lib/db');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  db.query("SELECT * FROM users ORDER BY id ASC",(error,query_result)=>{
    if (error) throw error;
    res.json({ title: 'users',  users: query_result.rows});
  })
});

module.exports = router;
