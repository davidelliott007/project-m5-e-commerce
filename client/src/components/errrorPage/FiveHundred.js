import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import errorImg from "../../public/fiveHundred.png";

const FiveHundred = () => {
  return (
    <Wrapper>
      <Img src={errorImg} />
    </Wrapper>
  );
};

export default FiveHundred;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 15px;
`;

const Img = styled.img``;

const Text = styled.p`
  color: ${COLORS.BLUE.SECONDARY};
  width: 75%;
`;
