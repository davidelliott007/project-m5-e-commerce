import React from "react";
import styled from "styled-components";
import { Feed } from "./Feed";
import { InputForm } from "./InputForm";
import { useState } from "react";
import { COLORS } from "../styles/Colors";
import { useSelector } from "react-redux";

import { getPages } from "../../reducers/CartReducer.js";

const Homepage = () => {
  const [showForm, setShowForm] = useState(false);
  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);
  const pages = useSelector(getPages);

  function handlePageClick(event) {
    console.log(event.target.id);
  }

  return (
    <Wrapper>
      <Ul>
        <Input type="submit" value="Options" onClick={displayForm} />
        {showForm ? <InputForm /> : null}
        {showForm ? (
          <Input type="submit" value="Hide" onClick={hideForm} />
        ) : null}
        <Feed />
      </Ul>
      {/* Feed function called here (Homepage Feed Component) */}

      <PageNavigator>
        {pages !== undefined
          ? Object.keys(pages).map((item) => {
              return (
                <ItemButton id={item} onClick={handlePageClick}>
                  {item}
                </ItemButton>
              );
            })
          : ""}
      </PageNavigator>
    </Wrapper>
  );
};

const ItemButton = styled.button`
  background-color: transparent;
  border: 0px;
  :hover {
    cursor: pointer;
    color: #47c1bf;
  }
`;

const PageNavigator = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  flex-wrap: wrap;
`;

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
