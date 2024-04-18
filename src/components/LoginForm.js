import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import firebaseApp from './firebase';
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth(firebaseApp);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const currentDate = new Date().toISOString();
      const userData = { email, latestLogin: currentDate };
      await axios.post("http://localhost:3000/users", userData);
      const sessionToken = userData; 
      onLogin(sessionToken)
      navigate('/');
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Failed to login. Please check your credentials.');
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Login</h2>
              {error && (
                <div className="alert alert-danger d-flex align-items-center">
                  <div>{error}</div>
                  <button type="button" className="btn-close ms-auto" onClick={handleCloseError}></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input type="text" className="form-control" id="username" placeholder="Enter your username" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
