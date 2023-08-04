import React, { useState } from 'react'
import './ToDoCard.css'
import { useOutletContext, useParams } from 'react-router-dom'

const ToDoCard = ({ todo, url }) => {
  const { setRefresh } = useOutletContext()
  

  const [completeStatus, setCompleteStatus] = useState(todo.isComplete)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editContent, setEditContent] = useState(todo.description)
  const [editPriority, setEditPriority] = useState("")
  const [toggleEdit, setToggleEdit] = useState(false)
  console.log(completeStatus)

  const handleEdit = async () => {
    setToggleEdit(true)
  }

  const handleSubmitEdit = async () => {
    setRefresh(true)
    const editData = {
      title: editTitle,
      description: editContent,
      priority: editPriority
    }
    const response = await fetch(`${url}/todos/update-one/${todo._id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(editData)
    })
    const data = await response.json()
    setToggleEdit(false)
    setRefresh(false)
  }
  
  const handleCompleted = async () => {
    setRefresh(true)
    console.log(todo._id)
    setCompleteStatus(!completeStatus)
    console.log(completeStatus)
    const body = {
      isComplete: completeStatus
    }
    const response = await fetch(`${url}/todos/update-one/${todo._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    const data = await response.json()
    
    setRefresh(false)
  }

  const handleDelete = async () => {
    setRefresh(true)
    const response = await fetch(`${url}/todos/delete-one/${todo._id}`, { method: 'DELETE' })
    const data = await response.json()
    setRefresh(false)
  }

  return (
    <>
      {toggleEdit ? (
        <div className='card'>
          <h2>
            Title:
            <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          </h2>
          <p>{todo._id}</p>
          <label>
            Content:
            <input value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          </label>
          <br />
          <select onChange={(e) => setEditPriority(e.target.value)}>
            <option value={'Low'}>Low</option>
            <option value={'Medium'}>Medium</option>
            <option value={'High'}>High</option>
          </select>
          <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
          <p>{todo.creationDate}</p>
          <p>{todo.lastModified}</p>
          <p>{todo.completedDate !== null && todo.completedDate}</p>
          <button onClick={handleSubmitEdit}>Submit Edit</button>
          <button onClick={handleCompleted}>Toggle Complete</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      ) : (
        <div className='card'>
            <h2>{todo.title}</h2>
            <p>{todo._id}</p>
            <p>{todo.description}</p>
            <p>{todo.priority}</p>
            <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
            <p>{todo.creationDate}</p>
            <p>{todo.lastModified}</p>
            <p>{todo.completedDate !== null && todo.completedDate}</p>
            <button onClick={handleEdit}>Toggle Edit</button>
            <button onClick={handleCompleted}>Toggle Complete</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </>
  )
}

export default ToDoCard