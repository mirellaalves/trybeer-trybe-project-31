import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import Login from './screens/Login';
import Profile from './screens/Profile';
import MainContext from './context/context';
import Products from './screens/Products';

function App() {
  return (
    <MainContext>
      <Router>
        <Switch>
          <Route exact path ="/products" component={ Products } />
          <Route path="/login" component={ Login } />
          <Route path="/profile" component={ Profile } />
          <Route exact path="/"> <Redirect to="/login" /> </Route>
        </Switch>
      </Router>
    </MainContext>
  );
}

export default App;
