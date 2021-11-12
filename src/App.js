import React from "react";
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import OrderForm from "./components/OrderForm";
import Confirmation from "./components/Confirmation";

const App = () => {
  return (
    <div className='App'>
      <nav>
        <h1 className='home-header'>Lambda Eats</h1>
        <Link to='/'>Home</Link>
      </nav>

      <Switch>
        <Route path='/pizza/confirmation'>
          <Confirmation />
        </Route>
        <Route path='/pizza'>
          <OrderForm />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
