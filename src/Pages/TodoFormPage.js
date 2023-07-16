import React, { useState } from 'react'
import { json, useNavigate, useOutletContext } from 'react-router-dom'

const TodoFormPage = () => {
  const { url, setRefresh } = useOutletContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(['low', 'medium', 'high'])

  const handleCreateTodo = async (e) => {
    e.preventDefault()
    setRefresh(true)
    const todo = {
      title: title,
      description: description,
      
    }
    const response = await fetch(`${url}/todos/create-one`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    const data = await response.json()
    console.log('todo', data)
    navigate('/')
    setRefresh(false)
  }

  return (
    <div>
        <h1>Create Todo Form</h1>
        <form onSubmit={handleCreateTodo}>
          <label htmlFor='title'>Title:</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor='description'>Description:</label>
          <input value={description} onChange={(e) => setDescription(e.target.value)} />
          <label htmlFor='priority'>Priority:</label>
          <select>
            <option value={priority[0]}>Low</option>
            <option value={priority[1]}>Medium</option>
            <option value={priority[2]}>High</option>
          </select>
          <button>Create Todo</button>
        </form>
    </div>
  )
}

export default TodoFormPage