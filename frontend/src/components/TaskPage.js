import {useLocation} from 'react-router-dom'
import {useState} from 'react';

import './TaskPage.css'


// change to async
function TaskPage(props){
    const location = useLocation();
    const [title,setTitle] = useState('');
    const [dateCreated,setDateCreated] = useState();
    const [taskDesc, setTaskDesc] = useState("No Description");
    console.log("TASK PAGE",location)
    // TODO: add check if current user is authorized to view this task
    fetch(process.env.REACT_APP_SERVER_URL+"list/task/"+props.id,{method:'get'})
    .then((res)=>{
        console.log(res);
        if (res.ok) return res.json();
        throw res;
    }).then(data =>{
        const task_info = data.task_info[0];
        // extract id and task_title to create title of the page
        setTitle('task-'+task_info.id + ': ' +task_info.task_title);
        
        // convert timestamp into date
        const dateOption = {
          year: "numeric",
          month: "long",
          day: "numeric"
        }
        const newDate = new Intl.DateTimeFormat('en-US',dateOption).format(Date.parse(task_info.created));
        setDateCreated(newDate);

        // set task description
        if (task_info.task_desc) {
            setTaskDesc(task_info.task_desc);
        }
    }).catch(error=>{
        console.error(error);
    })


    return (
        <div className = 'task-page'>
            <div className = 'page-top'>
                <div className = 'page-title'>{title}</div>
                <div className = 'page-top-right'>
                    <div className = 'page-buttons'>Buttons (edit, delete)</div>
                    <div className = 'page-date'>Created on: {dateCreated}</div>
                </div>
            </div>
            <article className = 'page-description'>{taskDesc}</article>
            <div className = 'page-comment'>Comment</div>
        </div>
    )
};
export default TaskPage;