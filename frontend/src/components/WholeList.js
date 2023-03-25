import "./WholeList.css"
import { useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import Buttons from "./Buttons";
import CreateTask from "./CreateTask";

function OnUpdateSubmit(){
  
}

function TaskDescription(props){
    const dispatch = useDispatch();
    const new_props = {...props,dispatch:dispatch}
    if (props.data.id === props.update_id) {
        return  <span className = 'update_task_desc'>
                    <form>
                        <input type = 'text' name = 'update_text' value = {props.data.task_desc}/>
                        <input type = 'hidden' name = 'task_id' value = {props.data.task_id}/>
                        <input type = 'submit' value = 'update' onClick={OnUpdateSubmit.bind(new_props)}></input>
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
    return  <li className = 'task_entry todo_component' >
                <TaskDescription data = {props.data} update_id = {props.update_id}></TaskDescription>
                <Buttons data = {props.data}></Buttons>
            </li>
}

function WholeList(){
    const dispatch = useDispatch();

    useEffect(
      ()=>{
        fetch("http://localhost:5000/list/",{method:'get'})
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
        return <Task data = {cur_task} update_id = {current_state.update_id} key = {cur_task.id} ></Task>
      });
    }
    
    return  <ul className = 'todo'>
              <CreateTask></CreateTask>
              {tasklist}
            </ul>
}
export default WholeList;