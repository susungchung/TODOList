import './App.css';
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux';
import WholeList from './components/WholeList';

function reducer(currentState,action){
  if(!currentState){
      return {title: 'task lists',tasks:[ {
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
    ],update_id: -1,next_id:26}
  }
  if (action.type === 'CREATE'){
    // const newState = {...currentState, tasks:[...currentState.task,{
    //   id:currentState.next_id,
    //   task_desc: action.new_task,
    //   completed:0,
    //   user_id:1
    // }], next_id:currentState.next_id+1}

    const newState = {...currentState,tasks:[...currentState.tasks]}
    newState.tasks.push({
      id:currentState.next_id,
      task_desc: action.new_task,
      completed:0,
      user_id:1
    });
    newState.next_id++;
    console.log(newState);
    return newState;
  }
}

const store = configureStore({reducer:reducer});

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Provider store = {store}>
        <WholeList>
        </WholeList>
      </Provider>
    </div>
  );
}

export default App;



// import axios from "axios";
// import USER from "./constants";
// export const requestUsers = (data) => async (dispatch) => { dispatch({ type: USER.LOAD, });
//   try { 
//     const json = await axios.get("data.json");
//     console.log(json); 
//     dispatch({ type: USER.LOAD_SUCCESS, usersData: json.data, isError: false, });
//   } catch (e) { dispatch({ type: USER.LOAD_SUCCESS, usersData: [], isError: true, }); } };


// import USER from "./constants"; 
// const initalState = { usersData: [], isLoading: false, isError: false, }; 
// const reducer = (state = initalState, action) => {
//   switch (action.type) { 
//     case USER.LOAD: return { ...state, isLoading: true, isError: false, }; 
//     case USER.LOAD_SUCCESS: return { ...state, usersData: action.usersData, isLoading: false, }; 
//     default: return state; } 
//   }; 