const express = require('express');
const db =  require('../lib/db');
const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.get('/users', (req, res) => {
    db.query("SELECT * FROM users ORDER BY id ASC",(error,query_result)=>{
      if (error) throw error;
      res.json({ title: 'users',  users: query_result.rows});
    })
  });
  

router.post('/register', (req,res) => {
    const post = req.body;
    const username = post.username;
    const password = post.password;
    db.query("INSERT INTO users (name,password) VALUES($1,$2)",[username,password],(error,query_result)=>{
        if(error) throw error;
        res.json({username:username,password:password});
    });
});

router.post('/signin',(req,res) => {
    const post = req.body;
    const username = post.username;
    const password = post.password;
    db.query("SELECT * FROM users WHERE name = $1",[username],(error,query_result)=>{
        if (error) throw error;
        else {
          if (query_result.rowCount != 0){
            if (query_result.rows[0].password === password){
              res.json({username:username,status: true});
            }
            else{
              res.json({message:"Wrong Password",status :false});
            }
          }
          else{
            res.json({message:"User doesn't exist",status :false});
          }
        }
    })
});

module.exports = router;