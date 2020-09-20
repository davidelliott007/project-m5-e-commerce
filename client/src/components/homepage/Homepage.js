import React from "react";
import styled from "styled-components";
import { Feed } from "./Feed";
import { InputForm } from './InputForm'
import { useState } from 'react'
import { COLORS } from '../styles/Colors'

const Homepage = () => {
    const [showForm, setShowForm] = useState(false)
    const displayForm = () => setShowForm(true)
    const hideForm = () => setShowForm(false)


  return (
    <Wrapper>
      
      <Ul>
        <Input type="submit" value="Options" onClick={displayForm} />
        { showForm ? <InputForm /> : null }
        { showForm 
        ? <Input type="submit" value="Hide" onClick={hideForm} />
        : null }
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

const Input = styled.input`
    background: ${COLORS.BLUE.PRIMARY};
    color: ${COLORS.BACKGROUND.PRIMARY};
    padding: 3px 8px;
    border-radius: 5px;
    border: none;
`;


const Ul = styled.ul`
  list-style-type: none;
  width: 75%;
  text-align: center;
  margin-top: 15px;
`;

export default Homepage;
