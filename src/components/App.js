import React from "react";
import {
  BrowserRouter as Router,
  Route,
  
} from "react-router-dom";
import "../index.css"
import Login from "./Login";
import Signup from "./Signup";
import Matched from "./Matched";
import UsersListContextProvider from "./UsersListContext";
import Likes from "./Likes";
import Profile from "./Profile";

const App = ()=>{



  return (
    <div>
      <UsersListContextProvider>
        <Router>
            <Route path="/" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/profile" exact component={Profile} />
            <Route path="/matched" exact component={Matched} />
            <Route path="/likes" exact component={Likes} />
        </Router>
      </UsersListContextProvider> 
    </div>
  )
}
export default App