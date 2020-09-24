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
    let number = parseInt(event.target.id);
    dispatch(updatePageToView(number));
  }

  return (
    <Wrapper>
      <Ul>
        
        <Feed />
      </Ul>
      {/* Feed function called here (Homepage Feed Component) */}

      <LineBreak></LineBreak>

      <PageNavigator>
        {pages !== undefined && Object.keys(pages).length > 1
          ? Object.keys(pages).map((item, i) => {
              let numberItem = parseInt(item);
              if (numberItem === pageNumber) {
                let item_display_number = parseInt(item) + 1;
                return (
                  <ItemButtonHighlighted id={item} onClick={handlePageClick}>
                    {item_display_number}
                  </ItemButtonHighlighted>
                );
              } else if (i === 10) {
                let item_display_number = parseInt(item) + 1;
                return (
                  <ItemButton id={item} onClick={handlePageClick}>
                    {item_display_number}
                  </ItemButton>
                );
              } else {
                let item_display_number = parseInt(item) + 1;
                return (
                  <ItemButton id={item} onClick={handlePageClick}>
                    {item_display_number}
                  </ItemButton>
                );
              }
            })
          : ""}
      </PageNavigator>
    </Wrapper>
  );
};
const LineBreak = styled.button`
  border: 0px;
  border-top: 1px dashed ${COLORS.BLUE.PRIMARY};
  background-color: transparent;
  height: 15px;
  width: 75%;
  margin-top: 10px;
`;

const ItemButton = styled.button`
  background-color: transparent;
  border: 0px;
  color: ${COLORS.PURPLE.TERTIARY};
  padding-bottom: 10px;
  padding-top: 5px;

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
  padding-bottom: 10px;
  padding-top: 5px;

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
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  max-width: 480px;
  border-radius: 5px;
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
