const express = require('express');
const db =  require('../lib/db');
const router = express.Router();


/* GET list page. */
router.get('/', (req, res) => {
    db.query("SELECT * FROM tasks",(error,query_result)=>{
        if (error) throw error;
        res.render('list.ejs', { title: 'task lists',  tasks: query_result, update_id: -1});
    })
});

router.post('/create',(req,res)=>{
    var post = req.body;
    var task_desc = post.new_task;
    db.query("INSERT INTO tasks (task_desc,completed,created,user_id) VALUES(?,FALSE,NOW(),1)",[task_desc],(error,query_result)=>{
        if(error) throw error;
        res.redirect('/list');
    });
});

router.get('/update/:task_id',(req,res) => {
    var task_id = req.params.task_id;
    db.query("SELECT * FROM tasks",(error,query_result)=>{
        if (error) throw error;
        res.render('list.ejs', {title: 'task lists', tasks: query_result, update_id: task_id});
    })
})

router.post('/update',(req,res)=>{
    var post = req.body;
    db.query("UPDATE tasks SET task_desc = ? WHERE id = ?",[post.updated_task,post.task_id],(error,result)=>{
        if(error) throw error;
        res.redirect('/list');
    });
})

router.post('/delete',(req,res)=>{
    var post = req.body;
    db.query("DELETE FROM tasks WHERE id = ?",[post.task_id],(error,result)=>{
        if (error) throw error;
        res.redirect('/list');
    })
});

router.post('/set_complete',(req,res)=>{
    var post = req.body;
    var task_id = post.task_id;
    var task_completed;
    console.log(post)
    if (post.completed === '0') task_completed = true;
    else task_completed = false;
    db.query("UPDATE tasks SET completed = ? WHERE id = ? ",[task_completed,task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect('/list');
    });
});

module.exports = router;