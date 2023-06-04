import "./WholeList.css"
import { useEffect } from 'react';
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';

import Buttons from "./Buttons";
import CreateTask from "./CreateTask"; 

function OnUpdateChange(event){
    event.preventDefault();
    this.setCurText(event.target.value);
}

function OnUpdateSubmit(event){
  //fetch updated data to server
  event.preventDefault();
  console.log(event)
  const data = {updated_task : event.target.update_text.value,task_id : event.target.task_id.value}
  console.log(data)
  fetch(process.env.REACT_APP_SERVER_URL+'list/update',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
  .then(res=>{return res.json()}).then(data=>{console.log(data)});

  event.target.reset();
  window.location.reload(false);
}

// change to place holder?
function TaskDescription(props){
    const dispatch = useDispatch();
    const new_props = {...props,dispatch:dispatch}
    if (props.data.id === props.update_id) {
        return  <span className = 'update_task_title'>
                    <form onSubmit = {OnUpdateSubmit.bind(new_props)}>
                        <input type = 'text' name = 'update_text' value = {props.curText} onChange = {OnUpdateChange.bind(new_props)}/> 
                        <input type = 'hidden' name = 'task_id' value = {props.data.id}/>
                        <input type = 'submit' value = 'update'></input>
                    </form>
                </span>
    }
    else{
        let class_name = '';
        if (props.data.completed) { class_name = 'completed_task'}
        else {class_name = 'incompleted_task' }
        return  <span className = {'task_title ' + class_name}>
                    {props.data.task_title}
                </span>
    }
}

function Task(props){
    const dragStartHandler = (e)=>{
      e.dataTransfer.setData("id",props.data.id);
      e.dataTransfer.setData("status",props.data.status);
    }

    const [curText,setCurText] = useState(props.data.task_title)
    return  <li 
              draggable 
              onDragStart={dragStartHandler} 
              //onClick={taskClickHandler}
              className = 'task_entry todo_component'
            >
              <Link className = 'todo_link list-group-item' to={`/tasks/${props.data.id}`}>
                <TaskDescription data = {props.data} update_id = {props.update_id} curText = {curText} setCurText = {setCurText}></TaskDescription>
                <Buttons data = {props.data}></Buttons>
              </Link>
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
    let user_id = ''
    let signinStatus = false;
    if (current_state){
      signinStatus = current_state.signinStatus;
      if (signinStatus) user_id = current_state.user_id;
    }

    useEffect(
      ()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"list/"+user_id,{method:'get'})
        .then((res)=>{
          console.log(res);
          if (res.ok){
            return res.json();
          }
          throw res;
        }).then(data =>{
          dispatch({type:"READ",data:data});
        }).catch(error=>{
          console.error(error);
        }).finally(()=>{});
    },[dispatch,user_id]);
    
    

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
        const data = {task_id:task_id};
        fetch(
          process.env.REACT_APP_SERVER_URL+`list/set_${statusValue}`,
          {method:"post",
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(data),
          mode: 'cors'})
        .then(res=>{
          return res.json()
        })
        .then(data=>{
          dispatch({type:"READ",data:data})
        });
      }
    }

    return  (
    <div className="task-columns">
      <ul 
        onDragOver={(e)=>{ e.preventDefault(); }} 
        onDrop={(e)=>{dropHandler(e,'todo')}}
        className = 'todo-group task-group list-group'
      >
        <div className='group-title'>Todo</div>
        <CreateTask state = {current_state}></CreateTask>
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
    </div>)
}
export default WholeList;