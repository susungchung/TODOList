const express = require('express');
const db =  require('../lib/db');
const e = require('express');
const router = express.Router();




/* GET list page. */
router.get('/', (req, res) => {
    db.query("SELECT id,task_title,completed,user_id,status FROM tasks ORDER BY id ASC",(error,query_result)=>{
        if (error) throw error;
        res.json({ title: 'task lists',  tasks: query_result.rows, update_id: -1});
    })
});

function getUserIDFromUsername(req,res,next){
    const username = req.params.username;
    req.user_id = -1;
    db.query("SELECT id FROM users WHERE name = $1",[username],(error,userid_result) =>{
        if (userid_result.rowCount!=0){
            req.user_id = userid_result.rows[0].id;
            console.log("ID CHANGED", req.user_id)
        }
    })
    next();
}

router.get('/:user_id',(req, res) => {
    db.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY id ASC",[req.params.user_id],(error,query_result)=>{
        if (error) throw error;
        res.json({ title: 'task lists',  tasks: query_result.rows, update_id: -1});
    })
});


router.get('/task/:task_id',(req,res)=>{
    console.log('TASK');
    db.query('SELECT * FROM tasks WHERE id = $1',[req.params.task_id],(error,query_result)=>{
        if (error) throw error;
        res.json({task_info: query_result.rows});
    })
})

router.post('/create',(req,res)=>{
    var post = req.body;
    var task_title = post.new_task;
    var username = post.username;
    if ((username) == ""){
        user_id = 1;
    }
    console.log("body:",post);
    db.query("INSERT INTO tasks (task_title,completed,created,user_id) VALUES($1,FALSE,NOW(),1)",[task_title],(error,query_result)=>{
        if(error) throw error;
        res.redirect('/list');
    });
});

router.get('/update/:task_id',(req,res) => {
    var task_id = req.params.task_id;
    db.query("SELECT * FROM tasks",(error,query_result)=>{
        if (error) throw error;
        if (query_result.rowCount !== 1) throw error
        res.render('list.ejs', {title: 'task lists', tasks: query_result[0], update_id: task_id});
    })
})

router.post('/update',(req,res)=>{
    var post = req.body;
    db.query("UPDATE tasks SET task_title = $1 WHERE id = $2",[post.updated_task,post.task_id],(error,result)=>{
        if(error) {
            console.log(error.stack);
            throw error;
        }
        res.redirect('/list');
    });
})

router.post('/delete',(req,res)=>{
    var post = req.body;
    console.log("delete_task_id:",post);
    db.query("DELETE FROM tasks WHERE id = $1",[post.task_id],(error,result)=>{
        if (error) throw error;
        res.redirect('/list');
    })
});

router.post('/set_complete',(req,res)=>{
    var post = req.body;
    var task_id = post.task_id;
    var new_completed;
    if (post.completed === 'false') new_completed = true;
    else new_completed = false;
    console.log(post,new_completed)
    db.query("UPDATE tasks SET completed = $1 WHERE id = $2 ",[new_completed,task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect('/list');
    });
});


router.post('/set_todo',(req,res)=>{
    var task_id = req.body.task_id;
    db.query("UPDATE tasks SET status = 'todo' WHERE id = $1",[task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect('/list');
    })
});
router.post('/set_in_progress',(req,res)=>{
    var task_id = req.body.task_id;
    db.query("UPDATE tasks SET status = 'in_progress' WHERE id = $1",[task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect('/list');
    })
});
router.post('/set_done',(req,res)=>{
    var task_id = req.body.task_id;
    db.query("UPDATE tasks SET status = 'done' WHERE id = $1",[task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect('/list');
    })
});


module.exports = router;