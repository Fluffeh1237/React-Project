import React from 'react';
import Card from '../components/shared/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container-fluid py-4">
      <h1 className="text-center mb-4">Mark Your Productivity</h1>
      
      <div className="row g-4">
        <div className="col-md-6">
          <Card title="Tasks">
            <p>Manage your daily tasks and stay organized.</p>
            <Link to="/tasks" className="btn btn-primary">Go to Tasks</Link>
          </Card>
        </div>
        
        <div className="col-md-6">
          <Card title="Notes">
            <p>Keep track of your important notes and ideas.</p>
            <Link to="/notes" className="btn btn-primary">Go to Notes</Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home; 