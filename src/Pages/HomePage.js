import React from 'react'
import { useOutletContext } from 'react-router-dom'
import ToDoCard from '../Components/ToDoCard'

const HomePage = () => {
  const { todoList, url } = useOutletContext()

  const todos = todoList.data
    console.log(todos)
  return (
    <div>
        <h1>Fullstack ToDo Application</h1>
        <div style={{ display: 'flex', gap: '2rem'}}>
            {todos && todos.map((todo) => <ToDoCard key={todo._id} todo={todo} url={url} />)}
        </div>
    </div>
  )
}

export default HomePage