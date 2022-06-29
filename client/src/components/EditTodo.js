import 'bootstrap/dist/js/bootstrap';
import React from 'react';

export const EditTodo = ({todo})=>{
  
  const [description, setDescription] = React.useState(todo.description);
  
  // save the the edited todo
  const saveChanges = async(event) =>{
    event.preventDefault();
    try {
      const body = {description}
        await fetch(`https://ahmad-pern-todo.herokuapp.com/todos/edit/${todo.todo_id}`,{
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(body)
        });
    } catch (error) {
      throw new Error(`the error is: ${error.message}`);
    }
  };
  
  return(
    <>
      <button 
        type="button" 
        className="btn btn-primary" 
        data-bs-toggle="modal" 
        data-bs-target={`#id${todo.todo_id}`}>
        Edit
      </button>

      <div className="modal fade" 
        id={`id${todo.todo_id}`} 
        tabIndex="-1" 
        aria-labelledby={`${todo.todo_id}`}
        aria-hidden="true"
        onClick={()=> setDescription(todo.description)}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={`${todo.todo_id}`}>Edit ToDo</h5>
              <button 
                type="button" 
                className="btn-close" 
                data-bs-dismiss="modal" 
                aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
              <input 
                type="text"
                name="description"
                value={description}
                className='form-control'
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary"  
                data-bs-dismiss="modal"
                onClick={()=> setDescription(todo.description)}>
                  Close
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                onClick={(event)=>saveChanges(event)}>
                  Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};