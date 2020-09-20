import React from "react";
import styled from "styled-components";
import { Feed } from "./Feed";
import { InputForm } from './InputForm'

const Homepage = () => {


  return (
    <Wrapper>
      
      <Ul>
        <InputForm />
        <Feed />
      </Ul>
      {/* Feed function called here (Homepage Feed Component) */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;


const Ul = styled.ul`
  list-style-type: none;
  width: 75%;
  text-align: center;
  margin-top: 15px;
`;

export default Homepage;
