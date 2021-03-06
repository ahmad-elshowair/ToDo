import express from 'express';
import pool  from './db.js';
import cors from "cors";
const app = express();
const port = 8000

// ============== middleware ============== //
app.use(express.json());
app.use(cors());

// ============== routes ============== //

// create a todo
app.post("/todos/create", async (req, res) => {
   try {
     const { description } = req.body;
     const sql = "INSERT INTO todo (description) VALUES($1) RETURNING *";
     const connection = await pool.connect();
     const createTodo = await connection.query(sql, [description]);
     res.json(createTodo.rows[0]);
     connection.release();
   } catch (err) {
     throw new Error(`error is: ${err.message}`);
   }
 });
// update a todo
app.put('/todos/edit/:id', async(req, res)=>{
   try {
      const {id} = req.params;
      const {description} = req.body;
      const query = 'UPDATE todo SET description=($1) WHERE todo_id =($2) RETURNING *';
      const connection = await pool.connect();
      const result = await connection.query(query,[description, id]);
      res.json({
         message: "the todo has updated successfully",
         data: result.rows[0]
      });
      connection.release();
   } catch (error) {
      throw new Error(`the error is: ${error.message}`);
   }
});



// read todoes
app.get('/todos', async(req, res)=>{
   try{
      const connection = await pool.connect();
      const query = 'SELECT * FROM todo';
      const allTodos = await connection.query(query);
      res.json(allTodos.rows);
      connection.release();
   } catch(error){
      throw new Error(`error is: ${err.message}`);
   }
});


// read a todo
app.get('/todos/todo/:id', async(req, res) =>{
   try {
      const {id} = req.params;
      const connection = await pool.connect();
      const query = 'SELECT * FROM todo WHERE todo_id = ($1)';
      const todo = await connection.query(query, [id]);
      res.json({
         message: "successfully grabbed a todo",
         data: todo.rows[0]
      });
      connection.release();
   } catch (error) {
      throw new Error(`error is: ${err.message}`);
   }
});
// delete a todo
app.delete('/todos/delete/:id', async(req, res) =>{
   try {
      const id  = req.params.id;
     const sql = "DELETE FROM todo WHERE todo_id = ($1) RETURNING *";
     const connection = await pool.connect();
     const deleteTodo = await connection.query(sql, [id]);
     res.json({
      message: "todo has deleted",
      data: deleteTodo.rows[0]
     });
     connection.release();

   } catch (error) {
      console.Error(`the error is: ${error.message}`);
   }
})

// ============== listen to the app ============== //
app.listen(port, ()=>{
   console.log(`the sever works on http://localhost:${port}`);
})
