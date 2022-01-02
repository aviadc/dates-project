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
import UsersListContextProvider from "./UsersListContext";

const App = ()=>{



  return (
    <div>
      <Router>
        <UsersListContextProvider>
          <Route path="/" exact component={Login} />
        </UsersListContextProvider>
        <Route path="/signup" exact component={Signup} />
        <Route path="/users:key" exact component={Users} />
        {/* <Route path="invoices" component={} /> */}
      </Router>
    </div>
  )
}
export default App