const express = require('express');
const db =  require('../lib/db');
const e = require('express');
const {checkSignedIn,checkPermissionFromParam,checkPermissionFromBody} = require('../lib/checkPermission')


const router = express.Router();

// cors setting
const cors = require('cors');

router.options('/',cors());
// router.options('/task/status', cors());
// router.options('/task/:task_id/update',cors());




/* GET list page. */
router.get('/',checkSignedIn, (req, res) => {
    db.query("SELECT id,task_title,completed,user_id,status,priority FROM tasks WHERE user_id = $1 ORDER BY id ASC",[req.session.user_id],(error,query_result)=>{
        if (error) throw error;
        res.json({ success:true, title: 'task lists',  tasks: query_result.rows, update_id: -1});
    })
});

router.post('/tasks/create',checkSignedIn,(req,res)=>{
    const user_id = req.session.user_id;
    const post = req.body;

    const title = post.title;
    const priority = post.priority;
    const status = post.status;
    const desc = post.desc;
    console.log("body:",post);
    db.query("INSERT INTO tasks (task_title,completed,created,user_id,priority,status,task_desc) VALUES($1,FALSE,NOW(),$2,$3,$4,$5)",[title,user_id,priority,status,desc],(error,query_result)=>{
        if(error) throw error;
        res.redirect('/list');
    });
});


router.patch('/task/:task_id/update',checkPermissionFromParam,(req,res)=>{
    const body = req.body;
    db.query(
        'UPDATE tasks SET task_title = $1, task_desc = $2, priority = $3, status = $4 where id =$5;',
        [body.title, body.desc, body.priority,body.status,req.params.task_id],
        (error,result)=>{
            if(error) {
                console.log(error.stack);
                throw error;
            }
        res.redirect(303,'/list');
    });
})


router.delete('/task/:task_id',checkPermissionFromParam,(req,res)=>{
    const task_id = req.params.task_id;
    db.query("DELETE FROM tasks WHERE id = $1",[task_id],(error,result)=>{
        if (error) throw error;
        res.redirect(303,'/list');
    })
})

// router.post('/delete',(req,res)=>{
//     var post = req.body;
//     console.log("delete_task_id:",post);
//     db.query("DELETE FROM tasks WHERE id = $1",[post.task_id],(error,result)=>{
//         if (error) throw error;
//         res.redirect('/list');
//     })
// });

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

router.get('/task/:task_id',checkPermissionFromParam,(req,res)=>{
    db.query('SELECT * FROM tasks WHERE id = $1',[req.params.task_id],(error,query_result)=>{
        if (error) throw error;
        res.json({success:true,task_info: query_result.rows});
    })
});

router.patch('/task/status',checkPermissionFromBody, (req,res)=>{
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