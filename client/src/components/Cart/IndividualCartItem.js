import React, { useRef } from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../actions";

const IndividualCartItem = ({ item }) => {
  const [error, setError] = React.useState("");
  const [inputValue, setInputValue] = React.useState(item.quantity);
  const dispatch = useDispatch();
  let quantity = item.quantity;
  const deleteDom = useRef(null);

  let subTotal = item.quantity * parseFloat(item.price.slice(1)).toFixed(2);
  return (
    <ItemContainer>
      <ItemWrapper>
        <ItemImage src={item.imageSrc} />
        <ItemDetails>
          <div>
            <ItemName to={`item/${item._id}`}>{item.name}</ItemName>
            {/* <Brand>
              By: <BrandName>{brand.name}</BrandName>
            </Brand> */}
          </div>
          <Price>CAN{item.price}</Price>
          <InputSection>
            <Input
              value={inputValue}
              onChange={(ev) => {
                const numbersOnly = /^\d+$/;

                //this first if checks for positive whole numbers and doesn't register an error if the string is empty
                if (
                  (!numbersOnly.test(ev.target.value) &&
                    ev.target.value !== "") ||
                  ev.target.value < 0 ||
                  ev.target.value % 1 !== 0
                ) {
                  setInputValue("");
                  dispatch(updateQuantity(item._id, 1));
                  setError("Please input a positive, whole number");
                  return;
                }
                //This checks if the quantity is above number in stock and sets it to the max capacity if the user inputs a number above stock level
                if (ev.target.value > item.numInStock) {
                  setInputValue(item.numInStock);
                  dispatch(updateQuantity(item._id, item.numInStock));
                  setError(`Only ${item.numInStock} left in stock`);
                  return;
                }
                //This changes the focus to delete button if user inputs 0
                if (ev.target.value === "0") {
                  setInputValue(ev.target.value);
                  dispatch(updateQuantity(item._id, ev.target.value));
                  setError("To delete item, press DELETE button");
                  deleteDom.current.focus();
                  return;
                }
                if (ev.target.value === "") {
                  setInputValue("");
                  dispatch(updateQuantity(item._id, 1));
                  setError("");
                  return;
                }
                setInputValue(ev.target.value);
                setError("");
                dispatch(updateQuantity(item._id, ev.target.value));
              }}
            ></Input>
            <SubTotal>
              SUBTOTAL:
              <SubTotalAmount>Can ${subTotal.toFixed(2)}</SubTotalAmount>
            </SubTotal>
          </InputSection>
          {error === "" ? null : <Error>{error}</Error>}
        </ItemDetails>
      </ItemWrapper>
      <DeleteButton
        ref={deleteDom}
        onClick={() => {
          dispatch(removeItem(item._id));
        }}
      >
        DELETE
      </DeleteButton>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  border-bottom: 1px solid ${COLORS.PURPLE.PRIMARY};
  padding: 20px 0;
`;

const ItemWrapper = styled.div`
  display: flex;
  padding: 0 5px;
`;

const ItemImage = styled.img`
  width: 30%;
  height: 150px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  max-width: 70%;
  justify-content: space-between;
`;

const ItemName = styled(Link)`
  display: inline-block;
  text-decoration: none;
  color: black;
  font-size: 1.1em;
  font-weight: 600;
  white-space: nowrap;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 10px;
`;

const Brand = styled.p``;

const BrandName = styled.span`
  font-weight: 400;
  font-style: italic;
`;

const Price = styled.p`
  font-weight: 600;
`;

const InputSection = styled.div`
  display: flex;
`;

const Input = styled.input`
  text-align: center;
  font-size: 1.3rem;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid ${COLORS.PURPLE.PRIMARY};
`;

const Error = styled.p`
  position: absolute;
  transform: translateY(100%);
  bottom: -10px;
  color: red;
`;

const SubTotal = styled.div`
  font-weight: 400;
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
`;

const SubTotalAmount = styled.p`
  font-weight: 400;
`;

const DeleteButton = styled.button`
  margin-top: 10px;
  margin-left: 5px;
  color: ${COLORS.PURPLE.PRIMARY};
  border-radius: 5px;
  font-weight: 400;
  font-size: 0.6em;
  width: 30%;
  padding-top: 5px;
  padding-bottom: 5px;
  background: none;
  border: 1px solid ${COLORS.PURPLE.PRIMARY};
`;
export default IndividualCartItem;
