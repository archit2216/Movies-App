import './App.css';
import React from "react";
import Navbar from "./Components/Navbar.js";
import Banner from "./Components/Banner";
import Movies from "./Components/Movies.js";
import Favourite from './Components/Favourite.js';
import {BrowserRouter as Router,Switch,Route,BrowserRouter} from "react-router-dom";
function App() {
  return (
    <div className="App">
    <Router>
      <Navbar /> 
      <Switch>
      <Route path="/" exact render={(props)=>(
        <div>
          <Banner {...props}/>
          <Movies {...props}/>
        </div>
      )}/>
      {/* Render method is used inorder to send props */}
      {/* <Banner />
      <Movies /> */}
      <Route path="/favourites" component={Favourite}/>
      </Switch>
      {/* <Favourite /> */}
      </Router>
    </div>
  );
}

export default App;
