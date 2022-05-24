import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import './App.css';

import WholeList from './components/WholeList';

/*
{title: 'task lists',tasks:[ {
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
],update_id: -1,next_id:26}*/


const initialState = {title: 'task lists',tasks:[],update_id: -1,next_id:0}
function reducer(currentState = initialState,action){
  if (action.type === 'CREATE'){
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
  if (action.type === 'READ'){
    const newState = {...action.data};
    return newState;
  }
}

const store = configureStore({reducer:reducer});

function App() {
  return (
    <div className="App">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Provider store = {store}>
        <WholeList></WholeList>
      </Provider>
    </div>
  );
}

export default App;

