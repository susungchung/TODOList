import "./WholeList.css"
import {useSelector} from 'react-redux';
import Buttons from "./Buttons";
import CreateTask from "./CreateTask";


function TaskDescription(props){
    if (props.data.id === props.update_id) {
        return  <span className = 'update_task_desc'>
                    <input type = 'text' name = 'update_text' value = {props.data.task_desc}/>
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
    const current_tasks = useSelector(state=>state.tasks);
    const current_update_id = useSelector(state=>state.update_id);
    let tasklist = current_tasks.map((cur_task)=>{
      return <Task data = {cur_task} update_id = {current_update_id} key = {cur_task.id} ></Task>
    });
    
    return  <ul className = 'todo'>
              <CreateTask></CreateTask>
              {tasklist}
            </ul>
}

export default WholeList;