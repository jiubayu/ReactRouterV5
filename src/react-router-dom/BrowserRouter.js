import React from "react";
import { Router } from "../react-router";
import { createBrowserHistory } from '../history';

function BroserHistory(props) {
  let history = createBrowserHistory();
  // console.log('history----')
  return (
    <Router history={history}>
      {props.children}
    </Router>
  )
}

export default BroserHistory;