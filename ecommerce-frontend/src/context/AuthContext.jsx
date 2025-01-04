import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })
      const { token, user } = res.data
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      setUser(user)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const register = async (name, email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      })
      const { token, user } = res.data
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      setUser(user)
      return true
    } catch (err) {
      console.error(err)
      return false
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  }

  useEffect(() => {
    console.log('User loaded from context:', user)
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
