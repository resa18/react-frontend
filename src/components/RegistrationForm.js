import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigate } from 'react-router-dom';
import firebaseApp from './firebase';
import 'firebase/auth';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const auth = getAuth(firebaseApp);
      await createUserWithEmailAndPassword(auth, email, password);

      setEmail('');
      setPassword('');
      setShowSuccessPopup(true);
      navigate('/login');

    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Register</h2>
              {showSuccessPopup && (
                <div className="success-popup">
                  <p>Registration successful!</p>
                  <button onClick={() => setShowSuccessPopup(false)}>Close</button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="text" className="form-control" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
