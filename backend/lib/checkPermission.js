const db = require('../lib/db');

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
    console.log("checkPermission Start")
    if (!(req.session.signed_in)){
        return res.json({success:false,message:"not signed in"})
    }

    console.log("checkPermission search owner")
    const taskOwner = await getTaskOwner(task_id);
    // no such task
    if (!taskOwner.success){
        return res.json({taskOwner})
    } 

    console.log("checkPermission compare userid")
    // current user does not have permisson on this task
    if (req.session.user_id !== taskOwner.user_id){
        return res.json({success:false,message:"current user does not have permission to view/modify this task"})
    }
    req.taskOwner = taskOwner.user_id;
    console.log("checkPermission done")
    // only proceed if current user is authorized to view/modify this task
    next();
}

module.exports = [checkSignedIn,checkPermission];