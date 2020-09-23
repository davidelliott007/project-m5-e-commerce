import React from "react";
import styled from "styled-components";
import { Feed } from "./Feed";
import { InputForm } from "./InputForm";
import { useState } from "react";
import { COLORS } from "../styles/Colors";
import { useDispatch, useSelector } from "react-redux";

import { updatePageToView } from "../../actions";

import { getPageNumber, getPages } from "../../reducers/FeedReducer.js";

const Homepage = () => {
  
  const pages = useSelector(getPages);
  const pageNumber = useSelector(getPageNumber);

  const dispatch = useDispatch();

  function handlePageClick(event) {
    console.log(event.target.id);
    let nummber = parseInt(event.target.id);
    dispatch(updatePageToView(nummber));
  }

  return (
    <Wrapper>
      <Ul>
        
        <Feed />
      </Ul>
      {/* Feed function called here (Homepage Feed Component) */}

      <PageNavigator>
        {pages !== undefined
          ? Object.keys(pages).map((item) => {
              let numberItem = parseInt(item);
              if (numberItem === pageNumber) {
                return (
                  <ItemButtonHighlighted id={item} onClick={handlePageClick}>
                    {item}
                  </ItemButtonHighlighted>
                );
              } else {
                return (
                  <ItemButton id={item} onClick={handlePageClick}>
                    {item}
                  </ItemButton>
                );
              }
            })
          : ""}
      </PageNavigator>
    </Wrapper>
  );
};

const ItemButton = styled.button`
  background-color: transparent;
  border: 0px;
  color: ${COLORS.PURPLE.TERTIARY};

  :hover {
    cursor: pointer;
    color: ${COLORS.PURPLE.SECONDARY};
  }
  :active {
    background-color: ${COLORS.PURPLE.PRIMARY};
  }
`;

const ItemButtonHighlighted = styled.button`
  background-color: ${COLORS.PURPLE.PRIMARY};

  border: 0px;
  border-radius: 5px;
  color: ${COLORS.BACKGROUND.PRIMARY};
  :hover {
    cursor: pointer;
    color: ${COLORS.PURPLE.SECONDARY};
  }
  :active {
    background-color: ${COLORS.PURPLE.PRIMARY};
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
