import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./styles/Colors";
import GlobalStyles from "./styles/GlobalStyles";
import Header from "../components/header/header";
import Cart from "../components/Cart/Cart";

function App() {
  return (
    <Router>
      <GlobalStyles />
      {
        //this is where the header component will be placed
      }
      <Header />
      <Switch>
        <Route exact path="/">
          {
            //this is where the feed component will be placed
          }
          <Cart></Cart>
        </Route>
        <Route path="/item/:itemID">
          <div>item</div>
        </Route>
      </Switch>
    </Router>
  );
}

const Test = styled.p`
  color: ${COLORS.PURPLE.PRIMARY};
  font-size: 100px;
`;

export default App;
