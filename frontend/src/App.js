import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Sales from './components/Sales';

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <h1>Sales Record App</h1>
        </header>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/sales" component={Sales} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
