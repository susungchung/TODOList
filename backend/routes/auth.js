const express = require('express');
const db =  require('../lib/db');
const router = express.Router();
const bcrypt = require('bcrypt');

// for encrypting
const saltRounds = 10;


/* GET users listing. */
router.get('/', (req, res) => {
    res.send('respond with a resource');
});

router.get('/users', (req, res) => {
    db.query("SELECT name FROM users ORDER BY id ASC",(error,query_result)=>{
      if (error) throw error;
      res.json({ title: 'users',  users: query_result.rows});
    })
  });
  

router.post('/register', async (req,res) => {
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

router.post('/signin',(req,res) => {
    const post = req.body;
    const username = post.username;
    const password = post.password;
    db.query("SELECT id,password FROM users WHERE name = $1",[username],async (error,query_result)=>{
        if (error) throw error;

        // no such user exist
        if (query_result.rowCount === 0){
          return res.json({message:"User doesn't exist",success :false});
        }

        const passwordMatch = await bcrypt.compare(password,query_result.rows[0].password)
        // wrong password
        if (!passwordMatch){
          return res.json({message:"Wrong Password",success :false});
        }
        // sign in successful
        req.session.signed_in = true;
        req.session.username = username;
        req.session.user_id = Number(query_result.rows[0].id);
        req.session.save(()=>{
          console.log('signin successful');
          // tell user signin was successful
          res.json({username:username,user_id:query_result.rows[0].id,success: true});
        });        
    })
});

router.get('/signin/status',(req,res)=>{
  if (!req.session.signed_in){
    return res.json({success:false});
  }
  res.json({success:true,username:req.session.username,user_id:req.session.user_id});
})

router.post('/signout',(req,res)=>{
  req.session.destroy((err)=>{
    if (err) throw err;
    res.json({success:true})
  })
})

module.exports = router;