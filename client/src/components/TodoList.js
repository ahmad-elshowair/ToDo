import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { EditTodo } from "./EditTodo";


export const TodoList = () =>{

  const [todos, setTodos] = React.useState([]);

  // get all todos
  const getTodos = async() =>{
    try {
      const response = await fetch('https://ahmad-pern-todo.herokuapp.com/todos')
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      throw new Error(`the error is: ${error.message}`);
    }
  }

  React.useEffect(()=>{
    getTodos();
  },[todos]);

  // delete a todo
 const handleDeleteAction = async (id)=>{
  try{
      await fetch(`https://ahmad-pern-todo.herokuapp.com/todos/delete/${id}`,{
        method: "DELETE"
      });
  }catch(error){
    throw new Error(`the error is: ${error.message}`);
  }
 }

 return (
  <section className="todo--list mt-5">
    <table className="table table-striped ">
      <thead>
        <tr>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo)=>{
          return(
            <tr key={todo.todo_id}>
              <td>
                {todo.description}
              </td>
              <td className="d-flex justify-content-between">
                <EditTodo todo={todo}/>
                <button className="btn btn-danger" onClick={() =>handleDeleteAction(todo.todo_id)}>Delete</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </section>
 );
};