import React from 'react';
import './App.css';
import { Input } from './components/Input';
import { TodoList } from './components/TodoList';

export const App = () =>{
  return(
    <main className='container'>
      <Input />
      <TodoList/>
    </main>
  )
};