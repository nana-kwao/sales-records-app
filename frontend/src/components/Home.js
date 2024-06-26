import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const goToSales = () => {
    if (localStorage.getItem('token')) {
      history.push('/sales');
    } else {
      alert('Please log in first!');
    }
  };

  return (
    <div className="container">
      <h2>Welcome to the Sales Record App</h2>
      <p>
        <Link to="/register">Register</Link> or <Link to="/login">Login</Link>
      </p>
      <button onClick={goToSales}>Go to Sales Page</button>
    </div>
  );
}

export default Home;
