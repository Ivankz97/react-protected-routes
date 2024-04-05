import { BrowserRouter, Link, Navigate, Route, Router, Routes, useNavigate, useRoutes } from 'react-router-dom'
import './App.css'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'
import Favorites from './pages/Favorites'
import ProtectedRoutes from './components/ProtectedRoutes'
import Admin from './pages/Admin'


function App() {

  const [user, setUser] = useState(null)

  const login = () => {

    setUser({
      id: 1,
      name: "Juan",
      last_name: "Perez",
      roles: ["tester"]
    })
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <BrowserRouter>
    <Navigation />
      {
        user ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )
        
      }
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route element={<ProtectedRoutes isAllowed={user ? true : false} />}>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/favorites' element={<Favorites />} />
        </Route>
        <Route path='/admin' element={
          <ProtectedRoutes isAllowed={!!user && user.roles.includes('admin')}>
            <Admin />
          </ProtectedRoutes>
        } />
        <Route path='*' element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

function Navigation () {
  return <nav>
    <ul>
      <li>
        <Link to={"/"}>Landing</Link>
      </li>
      <li>
        <Link to={"/dashboard"}>Dashboard</Link>
      </li>
      <li>
        <Link to={"/favorites"}>Favorites</Link>
      </li>
      <li>
        <Link to={"/admin"}>Admin</Link>
      </li>
    </ul>
  </nav>
}
 
export default App
