export default function CreateTask(props){
    return  <li className = 'create_task todo_component'>
                <form className = 'task_forms'  onSubmit = {onCreateSubmit.bind(props)}>
                    <input type = 'text' name = 'new_task' placeholder = 'new task'/>
                    <button><i className = 'fa fa-plus-square-o' ></i></button>
                </form>
            </li>
}

function onCreateSubmit(event){
    event.preventDefault();
    if (!event.target.new_task) return;
    this.onCreate();
}

