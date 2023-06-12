import { useEffect, useState} from "react";
import { Loading } from "./Misc"
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import FormTemplate from "./FormTemplate";

import './Misc.css'


function ModifyPage(props){
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setLoading] = useState(true);
    const [title,setTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState("No Description");
    const [taskStatus,setTaskStatus] = useState('');
    const [priority,setPriority] = useState('');
    const [error,setError] = useState(null);
    const task_id = new URLSearchParams(location.search).get("id");
    console.log(new URLSearchParams(location.search).get("id"),props);

    async function onModifySubmit(e){
        e.preventDefault();
        const fetchData = {
            title:e.target.title.value,
            desc: e.target.desc.value,
            priority: e.target.priority.value,
            status: e.target.status.value
        }
        const fetchOption = {
            method:"PATCH",
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(fetchData),
            mode: 'cors',
            credentials: 'include'
        }
        
        const fetchURL = process.env.REACT_APP_SERVER_URL+`tasks/${task_id}/update`;

        try {
            const res = await fetch(fetchURL,fetchOption);
            const data = await res.json()
            dispatch({type:"READ",data:data});
            navigate('/tasks');
        } 
        catch(error){
         if (error) throw error;
        }
    }

    useEffect(()=>{
        async function getData(){
            console.log('running effect')
            try{
            const fetchURL=process.env.REACT_APP_SERVER_URL+"tasks/"+task_id;
            const fetchOption={method:'get',credentials: 'include'}
            const res = await fetch(fetchURL,fetchOption)
            const data = await res.json();
            if (!data.success){
                alert(data.message);
                navigate('/tasks');
                return false
            }
            const task_info = data.task_info[0];
            setTitle(task_info.task_title);
            setTaskStatus(task_info.status);
            setPriority(task_info.priority);
            // set task description
            if (task_info.task_desc) {
                const parsedDesc = task_info.task_desc.replace(/(?:\r\n|\r|\n)/g, '\n');
                setTaskDesc(parsedDesc);
            }
            setLoading(false)
            }

            catch(error){
                if (error){setError( error )}
            }
        }
        getData();
    },[navigate,task_id])

    if (error){
        alert(error.message)
        return navigate({pathname:'/tasks',search:`id=${task_id}`})
    }

    if (loading){
        return <Loading/>
    }
    return (
        <FormTemplate 
            submitHandler={onModifySubmit}
            titleValue={title}
            priorityValue={priority}
            statusValue={taskStatus}
            descValue={taskDesc}></FormTemplate>
        )

}
export default ModifyPage;