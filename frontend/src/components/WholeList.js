import "../styles/WholeList.css"
import { useEffect } from 'react';
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';


//import Buttons from "./Buttons";
import { CreateButton } from "./Buttons";

import getSigninStatus from "../lib/getSigninStatus";

// change to place holder?
function TaskDescription(props){
    let class_name = '';
    if (props.data.completed) { class_name = 'completed_task'}
    else {class_name = 'incompleted_task' }
    return  <span className = {'task_title ' + class_name}>
                {`Task ${props.data.id} - ${props.data.task_title}`}
            </span>
}

function Task(props){
    const navigate = useNavigate();
    const dragStartHandler = (e)=>{
      e.dataTransfer.setData("id",props.data.id);
      e.dataTransfer.setData("status",props.data.status);
    }

    const clickHandler = (e) =>{
      e.preventDefault();
      const pathname = `/tasks?id=${props.data.id}`
      navigate(pathname);
    } 
    const [curText,setCurText] = useState(props.data.task_title)
    const icon_color =  props.data.priority ==='high'?'icon-red':
                  props.data.priority ==='medium'?'icon-yellow':
                  props.data.priority ==='low'?'icon-green':
                  'fa-minus';

    return  <li className = 'task_entry todo_component'>
              <div 
                draggable 
                onDragStart={dragStartHandler} 
                className = 'todo_link list-group-item' 
                onClick={clickHandler}
              >
                <TaskDescription data = {props.data} update_id = {props.update_id} curText = {curText} setCurText = {setCurText}></TaskDescription>
                <div className='list-view-priority'>
                  {`priority: ${props.data.priority} `}
                  <i className={`fa fa-solid fa-exclamation ${icon_color}`}></i>
                  </div>           
              </div>
            </li>
}


function populate_tasks_list(tasks,update_id){
  return tasks.map((cur_task)=>{
    return <Task data = {cur_task} update_id = {update_id} key = {cur_task.id}></Task>
  });

}

function WholeList(){
    const dispatch = useDispatch();
    const current_state = useSelector(state=>state);
    const navigate = useNavigate();

     useEffect(()=>{
      async function getTasks(){
        const status_data = await getSigninStatus()
        if (!status_data.success) {
          console.log('not signed in',status_data)
          dispatch({type:'SIGNOUT'});
          navigate('/signin');
          return false;
        } 
        dispatch({type:'UPDATE_SIGNIN_INFO',data:status_data})
        console.log('attemp to query tasks')
        try{
          const tasks_res = await fetch(process.env.REACT_APP_SERVER_URL+'tasks',{method:'get',credentials: 'include'});
          const tasks_data = await tasks_res.json();
          if (!tasks_data.success){
            console.log('task query failed')
            return
          }
          dispatch({type:"READ",data:tasks_data});
        }
        catch(error){
          console.log("error while loading tasks",error);
          throw(error);
        }
      }
      getTasks();
    },[dispatch,navigate]);
  
    

    let tasklist,tasks_in_progress,tasks_done = [];
    
    if (current_state){
      if (current_state.tasks_todo)        
        tasklist = populate_tasks_list(current_state.tasks_todo,current_state.update_id);
      if (current_state.tasks_in_progress)
        tasks_in_progress = populate_tasks_list(current_state.tasks_in_progress,current_state.update_id);
      if (current_state.tasks_done)
        tasks_done = populate_tasks_list(current_state.tasks_done,current_state.update_id);
    }

    const dropHandler = (e, statusValue)=>{
      // update status of the task based on its destination
      const oldStatus = e.dataTransfer.getData('status');
      const task_id = e.dataTransfer.getData('id');

      if (oldStatus !== statusValue){
        const data = {task_id:task_id,new_status:statusValue};
        fetch( process.env.REACT_APP_SERVER_URL+`tasks/status`,{
          method:"PATCH",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data),
          mode: 'cors',
          credentials: 'include'
        })
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          if (!data.success){
            console.log(data);
            alert(data.message);
            return
          }
          dispatch({type:"READ",data:data})
        });
      }
    }

    return  (
    <div className = 'content-area'>
      <div className="content-header">
        <p className = 'drag-info'>Try changing task status by performing drag and drop</p>
        <div className = 'content-buttons'>
          <CreateButton></CreateButton>
        </div>
      </div>
      <div className="task-columns">
        <ul 
          onDragOver={(e)=>{ e.preventDefault(); }} 
          onDrop={(e)=>{dropHandler(e,'todo')}}
          className = 'todo-group task-group list-group'
        >
          <div className='group-title'>Todo</div>
          {tasklist}
        </ul>
        
        <ul 
          onDragOver={(e)=>{ e.preventDefault(); }} 
          onDrop={(e)=>{dropHandler(e,'in_progress')}}
          className= 'in-progress-group task-group list-group'
        >
          <div className='group-title'>In progress</div>
          {tasks_in_progress}
        </ul>
        
        <ul 
          onDragOver={(e)=>{ e.preventDefault(); }} 
          onDrop={(e)=>{dropHandler(e,'done')}}
          className= 'done-group task-group list-group'
        >
          <div className='group-title'>Done</div>
          {tasks_done}
        </ul>
      </div>
    </div>)
}
export default WholeList;