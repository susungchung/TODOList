const express = require('express');
const db =  require('../lib/db');
const router = express.Router();
const bcrypt = require('bcrypt');

// create new session(i.e. signin)
router.post('/', async (req,res) => {
    const post = req.body;
    const username = post.username.trim();
    const password = post.password;
    try{
        const query_result = await db.query("SELECT id,password FROM users WHERE name = $1",[username]);
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

    }
    catch(error){
        if(error){
            res.json({success:false,message:'Server Failed'});
        }
    }
});

// get signin status from current session
router.get('/status',(req,res)=>{
    if (!req.session.signed_in){
        return res.json({success:false});
    }
    res.json({success:true,username:req.session.username,user_id:req.session.user_id});
})

// delete session (sign out)
router.delete('/',(req,res)=>{
    req.session.destroy((err)=>{
        if (err) throw err;
        res.json({success:true})
    })
})

module.exports = router;