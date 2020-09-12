import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";

const item = {
  name: "Skechers Go Run SK11 Go Run 2.4 GHz (Black/Silver)",
  price: "$48.99",
  body_location: "Wrist",
  category: "Fitness",
  _id: 7028,
  imageSrc:
    "data:image/jpeg;base64,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",
  numInStock: 15,
  companyId: 15211,
};
const brand = {
  name: "Skechers",
  url: "http://www.skechers.com/",
  country: "United States",
  _id: 15211,
};

const IndividualCartItem = () => {
  return (
    <ItemContainer>
      <ItemWrapper>
        <ItemImage src={item.imageSrc} />
        <ItemDetails>
          <div>
            <ItemName>{item.name}</ItemName>
            <Brand>
              By: <BrandName>{brand.name}</BrandName>
            </Brand>
          </div>
          <Price>CAN{item.price}</Price>
          <InputSection>
            <Input value={1}></Input>
            <SubTotal>
              SUBTOTAL:<SubTotalAmount>Can {item.price}</SubTotalAmount>
            </SubTotal>
          </InputSection>
        </ItemDetails>
      </ItemWrapper>
      <DeleteButton>DELETE</DeleteButton>
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
