import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function TaskComponent({ tsk }) {
  return (
    // Container div for a single task
    <div className="task">
      <div>
        <p> {tsk}</p>
      </div>
    </div>
  );
}
// Function component representing the main App
function App() {

  const [tasks, setTasks] = useState([]);

// State to store the value of the new task input field
  const [newTask, setNewTask] = useState('');

  // Fetch data from the backend when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/todo_data');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Function to handle form submission when adding a new task
  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await fetch('http://localhost:5000/todo_data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tsk: newTask })
      });
      setTasks([...tasks, { tsk: newTask }]);
      setNewTask('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // The body of the component
    <body>
      <div className='container'>
        <h1 className="tsk d-flex justify-content-center mt-4 mb-4">
          To Do List App
        </h1>
        <hr />  
    
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-center justify-content-center mb-5">
            
            <div className='enter col-2 p-2'>
              Enter the task
            </div>
            <input
              className='col-6 inpt p-2'
              type="text"
              name="data"
              placeholder='Enter your task'
              value={newTask}
              onChange={event => setNewTask(event.target.value)}
            />
            <button className='col-2 m- p-2' type="submit">Add Task</button>
            
          </div>
          
        </form>
      
        </div>

        {
  /* Renders TaskComponent for each task in the tasks array */
}

        {tasks.map((task, index) => (
          <TaskComponent key={index} tsk={task.tsk} />
        ))}
      
    </body>
  );
}

export default App;
