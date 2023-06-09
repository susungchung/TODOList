import {useEffect, useState} from 'react';
import Buttons from './Buttons';


import './TaskPage.css'


// change to async
function TaskPage(props){
    const [title,setTitle] = useState('');
    const [dateCreated,setDateCreated] = useState();
    const [taskDesc, setTaskDesc] = useState("No Description");
    const [error,setError] = useState(null);

    
    // TODO: add check if current user is authorized to view this task
    useEffect( ()=>{
        async function fetchData(){
            try{
                const fetchURL = process.env.REACT_APP_SERVER_URL+"list/task/"+props.id
                const fetchOption = {method:'get',credentials: 'include'}
                const res = await fetch(fetchURL,fetchOption);
                const data = await res.json();
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
            }
            catch (error){
                setError(error);
            }
        }


        fetchData()
    },[props.id]);

    if (error){
        return <div>{error.message}</div>
    }

    return (
        <div className = 'task-page'>
            <div className = 'page-top'>
                <div className = 'page-title'>{title}</div>
                <div className = 'page-top-right'>
                    <div className = 'page-buttons'>Buttons (edit, delete)</div>
                    {/* <Buttons task_id={props.id}></Buttons> */}
                    <div className = 'page-date'>Created on: {dateCreated}</div>
                </div>
            </div>
            <article className = 'page-description'>{taskDesc}</article>
            <div className = 'page-comment'>Comment</div>
        </div>
    )
};
export default TaskPage;