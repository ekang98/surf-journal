import React, {useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Journal from './journal/journal';
import Login from './login/login';
import Home from './home/home';
import PrivateRoute from './privateroute'
import { AuthContext } from './context/auth'

export default function App() {

  const existingTokens = JSON.parse(localStorage.getItem("tokens"));
  const [authTokens, setAuthTokens] = useState(existingTokens);
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return(
    <AuthContext.Provider value={{authTokens, setAuthTokens: setTokens}}>
      <Router>
        <div>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/login" component={Login}/>
            <PrivateRoute path="/dashboard" component={Journal}/>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}