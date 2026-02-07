import React, { useState, useEffect } from 'react';
import "./App.css"
import axios from 'axios';
import DeleteImg from "./assets/delete (1).png"
import UpdateImg from "./assets/pen.png"

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [oldTodo, setOldTodo] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const Base_URL = "https://todo-server-6t28.onrender.com";

  const loadTodos = async () => {
    console.log("Loading todos...");

      const response = await axios.get(`${Base_URL}/todos`);
      console.log(response.data.data);
      setTodos(response.data.data);

  };
  const deleteTodo = async (todo) => {
    const response = await axios.delete(`${Base_URL}/todos`,
      {data: { todo: todo }}
    );
    loadTodos();
  };
  const addTodo = async () => {
    const response = await axios.post(`${Base_URL}/todos`,{todo: newTodo});

    setNewTodo("");
    loadTodos();
  };

  const editTodo = async () => {
    const response = await axios.put(`${Base_URL}/todos`,
      {oldTodo: oldTodo, newTodo: newTodo}
    );
    setNewTodo("");
    setOldTodo("");
    setIsUpdating(false);
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <div >
      <h1>Todo List</h1>
      <div className='input-box'>
          <input type="text" 
          placeholder='Enter a todo' 
          className='input'
          value={newTodo} 
          onChange={(e) => setNewTodo(e.target.value)}
          />
          <button className='input-btn'
          onClick={() => {
            if(isUpdating){
              editTodo();
            }else{
              addTodo();
            }
          }}
          >{isUpdating ? "Update" : "Add"}</button>
        </div>
      <div className='todo-container'>
        {todos.map((todo,index) => {
          return (
            <div key={index} className='todo-card'>
                <p>{todo}</p>
                <div className='btn-container'>
                  <img src={UpdateImg}
                  alt="update"
                  className="update-btn"
                  onClick={()=>
                  {
                    setIsUpdating(true);
                    setOldTodo(todo);
                    setNewTodo(todo);
                  }
                  }
                  />

                  <img src={DeleteImg}
                  alt="delete"
                  className="delete-btn"
                  onClick={() => deleteTodo(todo)}/>
                </div>

            </div>);}
        )}
      </div>
       
    </div>
  );
}

export default App
