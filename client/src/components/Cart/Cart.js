import React from "react";
import styled from "styled-components";
import IndividualCartItem from "./IndividualCartItem";
import { useSelector } from "react-redux";
import { COLORS } from "../styles/Colors";

const Cart = () => {
  const storeItems = useSelector((state) => {
    return Object.values(state.cart);
  });

  let total = 0;
  storeItems.forEach((item) => {
    total += item.quantity * parseFloat(item.price.slice(1)).toFixed(2);
  });
  if (!total) {
    return (
      <EmptyWraper>
        <Empty>
          <p>Your cart is empty!</p>
        </Empty>
      </EmptyWraper>
    )
  }
  return (
    <Wrapper>
      {storeItems.map((item) => {
        return <IndividualCartItem item={item} key={item._id} />;
      })}
      <TotalWrapper>
        <Total>
          TOTAL: <Bigger> CAN ${total.toFixed(2)}</Bigger>
        </Total>
        <PurchaseButton>CHECKOUT</PurchaseButton>
      </TotalWrapper>
    </Wrapper>
  );
};

export default Cart;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0 0 0;
  max-width: 100%;
`;

const TotalWrapper = styled.div`
  padding: 15px 5px;
  color: ${COLORS.BACKGROUND.PRIMARY};
  background-color: ${COLORS.BLUE.SECONDARY};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Total = styled.p`
  font-weight: 600;
  font-size: 1.1em;
  background: none;
`;
const Bigger = styled.span`
  font-weight: 600;
  font-size: 1.1em;
  background: none;
`;

const PurchaseButton = styled.button`
  padding: 10px 0;
  width: 50%;
  margin: 20px auto;
  font-weight: 700;
  font-size: 1.1em;
  background-color: ${COLORS.PURPLE.PRIMARY};
  border-radius: 10px;
  border: none;
  color: ${COLORS.BACKGROUND.PRIMARY};
`;

const EmptyWraper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 40px;
  color: ${COLORS.PURPLE.PRIMARY};
  font-size: 1.5em;
  font-weight: 600;



`;

const Empty = styled.p`

`;


