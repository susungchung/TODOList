const express = require('express');
const db =  require('../lib/db');
const e = require('express');


const router = express.Router();

// cors setting
const cors = require('cors');

router.options('/',cors());
// router.options('/task/status', cors());
// router.options('/:task_id/update',cors());


// check if current user is signed in or not
const checkSignedIn = function(req,res,next){
    if (!(req.session.signed_in)){
        return res.json({success:false,message:"not signed in"})
    }
    // only proceed if current user is confirmed to be signed in
    next();
}

const getTaskOwner = async function(task_id){
    try{
        const res = await db.query("SELECT user_id FROM tasks where id = $1",[task_id]);
        if (res.rowCount === 0){
            return {success: false, message:"no task found"}
        }
        return {success:true,user_id:res.rows[0].user_id}
    }
    catch (error){
        if (error) throw error;
    }
}

// check if current user has permission to view/modify task
const checkPermission = async function(req,res,next){
    const task_id = req.params.task_id;
    // no signed in
    if (!(req.session.signed_in)){
        return res.json({success:false,message:"not signed in"})
    }

    const taskOwner = await getTaskOwner(task_id);
    // no such task
    if (!taskOwner.success){
        return res.json({taskOwner})
    } 

    // current user does not have permisson on this task
    if (req.session.user_id !== taskOwner.user_id){
        return res.json({success:false,message:"current user does not have permission to view/modify this task"})
    }
    req.taskOwner = taskOwner.user_id;
    // only proceed if current user is authorized to view/modify this task
    next();
}

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

// router.get('/update/:task_id',checkPermission,(req,res) => {
    
//     db.query("SELECT * FROM tasks",(error,query_result)=>{
//         if (error) throw error;
//         if (query_result.rowCount !== 1) throw error
//         res.render('list.ejs', {title: 'task lists', tasks: query_result[0], update_id: task_id});
//     })
// })

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

router.get('/task/:task_id',(req,res)=>{
    db.query('SELECT * FROM tasks WHERE id = $1',[req.params.task_id],(error,query_result)=>{
        if (error) throw error;
        res.json({task_info: query_result.rows});
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