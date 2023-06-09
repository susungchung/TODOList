const express = require('express');
const db =  require('../lib/db');
const e = require('express');
const [checkSignedIn,checkPermission] = require('../lib/checkPermission')


const router = express.Router();

// cors setting
const cors = require('cors');

router.options('/',cors());
// router.options('/task/status', cors());
// router.options('/:task_id/update',cors());




/* GET list page. */
router.get('/',checkSignedIn, (req, res) => {
    db.query("SELECT id,task_title,completed,user_id,status FROM tasks WHERE user_id = $1 ORDER BY id ASC",[req.session.user_id],(error,query_result)=>{
        if (error) throw error;
        res.json({ success:true, title: 'task lists',  tasks: query_result.rows, update_id: -1});
    })
});

router.post('/create',checkSignedIn,(req,res)=>{
    const user_id = req.session.user_id;
    var post = req.body;
    var task_title = post.new_task;
    console.log("body:",post);
    db.query("INSERT INTO tasks (task_title,completed,created,user_id) VALUES($1,FALSE,NOW(),$2)",[task_title,user_id],(error,query_result)=>{
        if(error) throw error;
        res.redirect('/list');
    });
});


router.patch('/:task_id/update',checkPermission,(req,res)=>{
    const body = req.body;
    db.query(
        'UPDATE tasks SET task_title = $1, task_desc = $2, completed = $3, status = $4 where id =$5;',[body.task_title,body.description, body.completed,body.status,body.id],(error,result)=>{
        if(error) {
            console.log(error.stack);
            throw error;
        }
        res.redirect(303,'/list');
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

router.get('/task/:task_id',checkPermission,(req,res)=>{
    db.query('SELECT * FROM tasks WHERE id = $1',[req.params.task_id],(error,query_result)=>{
        if (error) throw error;
        res.json({success:true,task_info: query_result.rows});
    })
});

router.patch('/task/status', (req,res)=>{
    const {new_status,task_id} = req.body;
    if (['todo','in_progress','done'].indexOf(new_status) === -1){
        return res.status(400);
    }

    db.query("UPDATE tasks SET status = $1 WHERE id = $2",[new_status,task_id],(error,query_result)=>{
        if (error) throw error;
        res.redirect(303,'/list')
    })
});


module.exports = router;