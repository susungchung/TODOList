const express = require('express');
const db =  require('../lib/db');
const router = express.Router();
const bcrypt = require('bcrypt');

// for encrypting
const saltRounds = 10;


// get user operation shouldn't be necessary unless there is an admin account

// router.get('/', (req, res) => {
//     db.query("SELECT name FROM users ORDER BY id ASC",(error,query_result)=>{
//       if (error) throw error;
//       res.json({ title: 'users',  users: query_result.rows});
//     })
//   });
  
// create new user
router.post('/', async (req,res) => {
    const post = req.body;
    const username = post.username;
    const password = post.password;
    try {
      const encryptedPassword = await bcrypt.hash(password,saltRounds)
      console.log(encryptedPassword);
      db.query("INSERT INTO users (name,password) VALUES($1,$2)",[username,encryptedPassword],(error,query_result)=>{
          if(error) throw error;
          res.json({username:username,password:password});
      });
    }
    catch{
      if (error) throw error;
    }
});

module.exports = router;
