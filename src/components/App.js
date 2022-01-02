import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import "../index.css"
import Login from "./Login";
import Signup from "./Signup";
import Users from "./Users";

const App = ()=>{



  return (
    <div>
      <Router>
        <Route path="/" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/users:key" exact component={Users} />
        {/* <Route path="invoices" component={} /> */}
      </Router>
    </div>
  )
}
export default App