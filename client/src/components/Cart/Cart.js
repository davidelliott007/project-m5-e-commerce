import React from "react";
import styled from "styled-components";
import IndividualCartItem from "./IndividualCartItem";

const Cart = () => {
  return (
    <Wrapper>
      <IndividualCartItem />
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;
