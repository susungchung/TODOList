import "./WholeList.css"
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
    const temp_data = {title: 'task lists',tasks:[ {
        id: 12,
        task_desc: 'implement drag and drop',
        completed: 0,
        user_id: 1
      },
       {
        id: 15,
        task_desc: 'host it on web',
        completed: 0,
        user_id: 1
      },
       {
        id: 17,
        task_desc: 'sub task system(optional)',
        completed: 0,
        user_id: 1
      },
       {
        id: 21,
        task_desc: 'make box size proportional to screen size',
        completed: 1,
        user_id: 1
      },
       {
        id: 22,
        task_desc: 'allow input text box to grow based on input length',
        completed: 0,
        user_id: 1
      },
       {
        id: 23,
        task_desc: 'add create and delete button for update',
        completed: 0,
        user_id: 1
      },
       {
        id: 24,
        task_desc: 'make box for the entire list look nice (not the entire width, change size based on screen size)',
        completed: 1,
        user_id: 1
      },
       {
        id: 25,
        task_desc: 'change font',
        completed: 0,
        user_id: 1
      }
    ],update_id: -1}

    let tasklist = temp_data.tasks.map((cur_task)=>{
        return <Task data = {cur_task} update_id = {temp_data.update_id} key = {cur_task.id} ></Task>
    });
    
    return  <ul className = 'todo'>
                <CreateTask onCreate = {onCreate}></CreateTask>
                {tasklist}
            </ul>
}

function onCreate(event){
  console.log('onCreate')
}


    

export default WholeList;