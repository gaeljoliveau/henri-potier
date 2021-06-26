import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

//Component page
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

const App = () => {
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
    
  );
};

export default App;
