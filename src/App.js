import './App.css';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Components/Navbar';


function App() {
  const url = process.env.REACT_APP_URL_ENDPOINT

  const [todoList, setTodoList] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getTodos = async () => {
      const response = await fetch(`${url}/todos/all-todos`)
      const data = await response.json()
      setTodoList(data)
    }
    getTodos()
  }, [url, refresh])

  return (
    <div className="App">
      <Navbar />
      <Outlet context={{ todoList, url, setRefresh }} />
    </div>
  );
}

export default App;
