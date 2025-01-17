import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const navigate = useNavigate();

  // Durasi timeout dalam milidetik (15 menit)
  const TIMEOUT_DURATION = 15 * 60 * 1000;
  let timeoutId;

  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      const { token, user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);
      startTimeout();

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (name, email, password, phone, address) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        phone,
        address,
      });
      const { token, user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setUser(user);
      startTimeout();

      // Redirect based on role
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    clearTimeout(timeoutId);
    navigate('/login');
  };

  const resetTimeout = () => {
    clearTimeout(timeoutId);
    startTimeout();
  };

  const startTimeout = () => {
    timeoutId = setTimeout(() => {
      logout();
      alert('Anda telah otomatis logout karena tidak ada aktivitas selama 15 menit.');
    }, TIMEOUT_DURATION);
  };

  useEffect(() => {
    if (user) {
      startTimeout();

      // Reset timeout on any user interaction
      const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
      events.forEach(event => window.addEventListener(event, resetTimeout));

      return () => {
        clearTimeout(timeoutId);
        events.forEach(event => window.removeEventListener(event, resetTimeout));
      };
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
