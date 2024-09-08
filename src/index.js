import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, Route, Switch, Redirect, Link, NavLink} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Protected from './components/Protected';
import Login from './components/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ul>
      {/* <li><Link to="/">首页</Link></li>
      <li><Link to="/user" >用户管理</Link></li>
      <li><Link to="/profile" >个人中心</Link></li> */}
      <li><NavLink className="strong" style={{ textDecoration: 'line-through' }} activeStyle={{ color: 'red' }} to="/" exact>Home</NavLink></li>
      <li><NavLink activeStyle={{ color: 'red' }} to="/user">User</NavLink></li>
      <li><NavLink activeStyle={{ color: 'red' }} to="/profile">Profile</NavLink></li>
    </ul>
    <Switch>
      <Route path="/" component={Home} exact={true} />
      <Route path="/user" component={User} />
      {/* <Route path="/profile" component={Profile} /> */}
      {/* <Route component={ () => <div>404</div>} /> */}
      <Protected path='/profile' component={Profile} />
      <Route path="/login" component={Login} />
      <Redirect to="/" />
    </Switch>
  </Router>
);
