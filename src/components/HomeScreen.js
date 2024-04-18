import React from 'react';
import { Button } from 'react-bootstrap';

const HomeScreen = ({ onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Welcome to the Home Screen!</h1>
              <div className="text-center">
                <Button variant="primary" onClick={handleLogout}>Logout</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
