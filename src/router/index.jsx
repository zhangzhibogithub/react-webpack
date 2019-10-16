import React from "react";

import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "../pages/index/index";
import News from "../pages/news/index";

export default (
  <Router>
 
      <Route exact path="/" component={Index}></Route>
      <Route exact path="/news" component={News}></Route>
  
  </Router>
);
