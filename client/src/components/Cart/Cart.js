import React from "react";
import styled from "styled-components";
import IndividualCartItem from "./IndividualCartItem";
import { useSelector } from "react-redux";
import { COLORS } from "../styles/Colors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../../actions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Cart = () => {
  const storeItems = useSelector((state) => {
    return Object.values(state.cart);
  });

  const dispatch = useDispatch();
  const [ValidationData, setValidationData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [status, setStatus] = React.useState("idle");

  let total = 0;
  storeItems.forEach((item) => {
    total += item.quantity * parseFloat(item.price.slice(1)).toFixed(2);
  });

  if (status === "loading") {
    return (
      <LoaderWrapper>
        {/* Loading Style */}
        <Loader
          type="Grid"
          color={COLORS.BLUE.PRIMARY}
          m
          height={80}
          width={80}
        />
      </LoaderWrapper>
    );
  }

  if (ValidationData !== null && error === "") {
    return (
      <ValidationWrapper>
        <Confirmation>Thank you for your purchase !</Confirmation>
        <Paragraph>
          Your confirmation number is <div>{ValidationData.order.orderId}</div>
        </Paragraph>
        <Paragraph>
          Need anything else ?{" "}
          <ContinueShopping to={"/"}>Continue Shopping</ContinueShopping>
        </Paragraph>
      </ValidationWrapper>
    );
  }

  if (error !== "") {
    return (
      <ValidationWrapper>
        <Confirmation>We're sorry, something went wrong !</Confirmation>
        <Paragraph>
          Please{" "}
          <ContinueShopping
            to={"#"}
            onClick={(ev) => {
              setError("");
            }}
          >
            try again
          </ContinueShopping>
        </Paragraph>
      </ValidationWrapper>
    );
  }

  if (!storeItems.length) {
    return (
      <EmptyWraper>
        <Empty>
          <p>Your cart is empty!</p>
        </Empty>
      </EmptyWraper>
    );
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
        <PurchaseButton
          onClick={() => {
            setValidationData(null);
            setStatus("loading");
            fetch("/purchase", {
              method: "PUT",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(storeItems),
            })
              .then((res) => {
                if (!res.ok) {
                  throw Error("server Error");
                }
                return res.json();
              })
              .then((data) => {
                setStatus("idle");
                console.log(data);
                setValidationData(data);
                dispatch(clearCart());
              })
              .catch((err) => {
                setStatus("idle");
                console.log(err);
                setError("error");
              });
          }}
        >
          CHECKOUT
        </PurchaseButton>
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

const Empty = styled.p``;

const ValidationWrapper = styled.div`
  margin-top: 40px;
  margin-left: 5px;
`;

const Confirmation = styled.h1`
  color: ${COLORS.PURPLE.PRIMARY};
  margin: 20px 0;
  font-size: 1.2em;
`;

const Paragraph = styled.p`
  margin: 20px 0;
`;

const ContinueShopping = styled(Link)``;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
