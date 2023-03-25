import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit'
import './App.css';

import WholeList from './components/WholeList';

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
  if (action.type === 'UPDATE'){
    const newState = {...currentState};
    newState.update_id = action.id
    return newState
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

