


function CreateTask(){
    return <div>
        <li className = 'create_task todo_component'>
            <form action = '/list/create' method = 'post' className = 'task_forms'>
                <input type = 'text' name = 'new_task' placeholder = 'new task'/>
                <button><i className = 'fa fa-plus-square-o'></i></button>
            </form>
        </li>
    </div>
}

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

function UpdateButton(props){
    return <a href = {'/list/update/' + props.data.id} className = 'update_task task_forms'>
                <span className = 'fa fa-edit'></span>
            </a>
}

function CompleteButton(props){
    let icon = props.data.completed 
                    ? <i className = 'fa fa-check-square-o'></i>
                    : <i className = 'fa fa-square-o'></i>
    return <form action ='/list/set_complete' method = 'post' className = 'task_forms completed_button'>
    <input type = 'hidden' name = 'task_id' value = {props.data.id}/>
    <input type = 'hidden' name = 'completed' value = {props.completed}/>
    <button>
        {icon}
    </button>
</form>
}
function DeleteButton(props) {
    return <form action = '/list/delete' method = 'post' className = 'task_forms'>
        <input type = 'hidden' name = 'task_id' value = {props.id}/>
        <button>
            <i className = 'fa fa-remove'></i>
        </button>
    </form>
}

function Buttons(props){
    return <span className = 'task_buttons'>
        <UpdateButton data = {props.data}></UpdateButton>
        <CompleteButton data = {props.data}></CompleteButton>
        <DeleteButton id = {props.data.id}></DeleteButton>
    </span>
}


function Task(props){
    return <li key = {props.data.id} className = 'task_entry todo_component'>
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
        return <Task data = {cur_task} update_id = {temp_data.update_id}></Task>
    });
    
    return<div>
            <ul className = 'todo'>
                <CreateTask></CreateTask>
                {tasklist}
            </ul>
        </div>
}

    

export default WholeList;