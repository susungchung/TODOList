import "./WholeList.css"
import { useEffect } from 'react';
import { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
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
  fetch(REACT_APP_SERVER_URL+'list/update',{method:"post",headers:{'Content-Type': 'application/json'},body:JSON.stringify(data),mode: 'cors'})
  .then(res=>{return res.json()}).then(data=>{console.log(data)});

  event.target.reset();
  window.location.reload(false);
}

// change to place holder?
function TaskDescription(props){
    const dispatch = useDispatch();
    const new_props = {...props,dispatch:dispatch}
    if (props.data.id === props.update_id) {
        return  <span className = 'update_task_desc'>
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
        return  <span className = {'task_desc ' + class_name}>
                    {props.data.task_desc}
                </span>
    }
}

function Task(props){
    const [curText,setCurText] = useState(props.data.task_desc)
    return  <li className = 'task_entry todo_component' >
                <TaskDescription data = {props.data} update_id = {props.update_id} curText = {curText} setCurText = {setCurText}></TaskDescription>
                <Buttons data = {props.data}></Buttons>
            </li>
}

function WholeList(){
    const dispatch = useDispatch();

    useEffect(
      ()=>{
        fetch(process.env.REACT_APP_SERVER_URL+"list/",{method:'get'})
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
    },[dispatch]);


    let tasklist = [];
    const current_state = useSelector(state=>state);
    if (current_state){
      tasklist = current_state.tasks.map((cur_task)=>{
        return <Task data = {cur_task} update_id = {current_state.update_id} key = {cur_task.id}></Task>
      });
    }
    
    return  <ul className = 'todo'>
              <CreateTask></CreateTask>
              {tasklist}
            </ul>
}
export default WholeList;