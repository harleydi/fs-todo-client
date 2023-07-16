import React from 'react'

const ToDoCard = ({ todo }) => {
  return (
    <div>
        <h2>{todo.title}</h2>
        <p>{todo._id}</p>
        <p>{todo.content}</p>
        <p>{todo.priority}</p>
        <p>{todo.isComplete ? 'Complete' : 'Incomplete'}</p>
        <p>{todo.creationDate}</p>
        <p>{todo.lastModified}</p>
        <p>{todo.completedDate !== null && todo.completedDate}</p>
    </div>
  )
}

export default ToDoCard