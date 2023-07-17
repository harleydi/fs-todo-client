import React, { useState } from 'react'
import './ToDoCard.css'
import { useOutletContext, useParams } from 'react-router-dom'

const ToDoCard = ({ todo, url }) => {
  const { setRefresh } = useOutletContext()
  const { id } = useParams()
  // console.log(id)
  

  const handleCompleted = async () => {
    // setRefresh(true)
    console.log(todo._id)
    const body = {
      isComplete: !todo.isComplete
    }
    const response = await fetch(`${url}/todos/update-completed/${todo._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "appliction/json"
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    console.log(data.data.isComplete)
    // setRefresh(false)
  }

  const handleDelete = async () => {
    setRefresh(true)
    const response = await fetch(`${url}/todos/delete-one/${todo._id}`, { method: 'DELETE' })
    const data = await response.json()
    setRefresh(false)
  }

  return (
    <div className='card'>
        <h2>{todo.title}</h2>
        <p>{todo._id}</p>
        <p>{todo.content}</p>
        <p>{todo.priority}</p>
        <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
        <p>{todo.creationDate}</p>
        <p>{todo.lastModified}</p>
        <p>{todo.completedDate !== null && todo.completedDate}</p>
        <button onClick={handleCompleted}>Toggle Complete</button>
        <button onClick={handleDelete}>Delete</button>
    </div>
  )
}

export default ToDoCard