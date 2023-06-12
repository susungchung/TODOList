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
    const username = post.username.trim();
    const password = post.password;

    try {
      // check if username is available
      const query_res = await db.query('SELECT EXISTS(SELECT 1 FROM users WHERE name = $1)',[username]);
      const userExists = query_res.rows[0].exists
      console.log(userExists?'username is already being used':'username is free to use');
      if (userExists) return res.json({success:false,message:'This username is already being used'});
      const encryptedPassword = await bcrypt.hash(password,saltRounds)
      await db.query("INSERT INTO users (name,password) VALUES($1,$2)",[username,encryptedPassword]);
      res.json({success:true,username:username,password:password});
    }
    catch(error){
      if (error) {
        res.json({success:false,message:'Server Failed'})
        throw error
      }
    }
});

module.exports = router;
