import React from "react";
import styled from "styled-components";
import IndividualCartItem from "./IndividualCartItem";
import { useSelector } from "react-redux";
import { getStoreItemArray } from "../../reducers/CartReducer";

const Cart = () => {
  const storeItems = useSelector((state) => {
    return Object.values(state.cart);
  });
  console.log(storeItems);
  return (
    <Wrapper>
      {storeItems.map((item) => {
        return <IndividualCartItem item={item} />;
      })}
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
`;
