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
import Matched from "./Matched";
import UsersListContextProvider from "./UsersListContext";
import Likes from "./Likes";
import Profile from "./Profile";

const App = ()=>{



  return (
    <div>
      <Router>
        <UsersListContextProvider>
          <Route path="/" exact component={Login} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/matched" exact component={Matched} />
          <Route path="/likes" exact component={Likes} />
        </UsersListContextProvider> 
      </Router>
    </div>
  )
}
export default App