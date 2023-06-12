import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ModifyButton,DeleteButton } from './Buttons';

import getSigninStatus from '../lib/getSigninStatus';
import { Loading } from "./Misc";


import '../styles/TaskPage.css'
import '../styles/Misc.css'

// change to async
function TaskPage(props){
    const [loading,setLoading] = useState(true);
    const [title,setTitle] = useState('');
    const [dateCreated,setDateCreated] = useState();
    const [taskDesc, setTaskDesc] = useState("No Description");
    const [taskStatus,setTaskStatus] = useState('');
    const [priority,setPriority] = useState('');
    const [error,setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // TODO: add check if current user is authorized to view this task
    useEffect( ()=>{
        async function fetchData(){
            try{
                const status_data = await getSigninStatus();
                dispatch({type:'UPDATE_SIGNIN_INFO',data:status_data})

                const fetchURL = process.env.REACT_APP_SERVER_URL+"tasks/"+props.id
                const fetchOption = {method:'get',credentials: 'include'}
                const res = await fetch(fetchURL,fetchOption);
                const data = await res.json();
                if (!data.success){
                    alert(data.message);
                    navigate('/tasks');
                    return false
                }
                const task_info = data.task_info[0];
                // extract id and task_title to create title of the page
                setTitle(task_info.task_title);
                
                // convert timestamp into date
                const dateOption = {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
                const newDate = new Intl.DateTimeFormat('en-US',dateOption).format(Date.parse(task_info.created));
                setDateCreated(newDate);

                setTaskStatus(task_info.status);
                setPriority(task_info.priority);

                // set task description
                if (task_info.task_desc) {
                    const parsedDesc = task_info.task_desc.replace(/(?:\r\n|\r|\n)/g, '\n');
                    setTaskDesc(parsedDesc);
                }

                setLoading(false);
                return true
            }
            catch (error){
                setError(error);
            }
        }
        fetchData()
    },[props.id,navigate,dispatch]);

    if (error){
        return <div>{error.message}</div>
    }
    const info = {
        task_id:props.id,
        title:title,
        taskDesc:taskDesc,
        taskStatus: taskStatus,
        priority:priority
    }
    
    const icon_color =  priority ==='high'?'icon-red':
                        priority ==='medium'?'icon-yellow':
                        priority ==='low'?'icon-green':
                        'fa-minus';


    if (loading){
        return <Loading/>
    }


    return (
        <div className = 'task-page'>
            <div className = 'page-top'>
                <div className = 'page-title'><b>{'task-'+props.id + ': ' +title}</b></div>
                <div className = 'page-top-right'>
                    <div className = 'page-buttons'>
                        <ModifyButton className= 'page-update-button' data = {info}></ModifyButton>
                        <DeleteButton task_id={props.id}></DeleteButton>
                    </div>                    
                    {/* <Buttons task_id={props.id}></Buttons> */}
                    <div className = 'page-date'><b>Created on: </b>{dateCreated}</div>
                    <div><b>Current Status: </b>{taskStatus === 'in_progress'?'in progress':taskStatus}</div>
                    <div><b>Priority: </b>{priority} <i className={`fa fa-solid fa-exclamation ${icon_color}`}></i></div>
                </div>
            </div>
            
            <article className = 'page-description'><b>Description : </b><br/>{`${taskDesc}`}</article>
            <div className = 'page-comment'><b>Comments:</b><br/></div>
        </div>
    )
};
export default TaskPage;