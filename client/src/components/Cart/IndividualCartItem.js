import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "../../actions";

const IndividualCartItem = ({ item }) => {
  const dispatch = useDispatch();
  let quantity = item.quantity;

  let subTotal = item.quantity * parseFloat(item.price.slice(1)).toFixed(2);
  return (
    <ItemContainer>
      <ItemWrapper>
        <ItemImage src={item.imageSrc} />
        <ItemDetails>
          <div>
            <ItemName>{item.name}</ItemName>
            {/* <Brand>
              By: <BrandName>{brand.name}</BrandName>
            </Brand> */}
          </div>
          <Price>CAN{item.price}</Price>
          <InputSection>
            <Input
              type="number"
              value={quantity}
              onChange={(ev) => {
                dispatch(updateQuantity(item._id, ev.target.value));
              }}
            ></Input>
            <SubTotal>
              SUBTOTAL:<SubTotalAmount>Can ${subTotal}</SubTotalAmount>
            </SubTotal>
          </InputSection>
        </ItemDetails>
      </ItemWrapper>
      <DeleteButton
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
  display: flex;
  flex-direction: column;
  padding: 0 5px;
  max-width: 69vw;
  justify-content: space-between;
`;

const ItemName = styled.h1`
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
