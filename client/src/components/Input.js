import React from "react";

export const Input = () =>{
  const [description, setDescription] = React.useState("");

  const handleOnSubmit = async (event)=>{
    event.preventDefault();
    try {
      const body = { description };

      const response = await fetch('http://localhost:8000/todos/create', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      }); 
      console.log(response);
    } catch (error) {
      throw new Error(`the error is: ${error.message}`);
    }
  }
  return (
    <>
      <h1 className="text-center mt-5">ToDo</h1>
      <form className="mt-5 d-flex" onSubmit={handleOnSubmit} >
        <input type="text" 
               className="form-control"
               name="description"
               value={description}
               onChange={(event) => setDescription(event.target.value)}
        />
        <button className="btn btn-success">Add</button>
      </form>
    </>
  );
};