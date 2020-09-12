import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {
        //this is where the header component will be placed
      }
      <Switch>
        <Route exact path="/">
          {
            //this is where the feed component will be placed
          }
          <div>test</div>
        </Route>
        <Route path="/item/:itemID">
          <div>item</div>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
