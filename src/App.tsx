import React from 'react';
import './App.css';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

