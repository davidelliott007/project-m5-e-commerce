import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { PaginateItems } from "../../actions";

export const InputForm = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => {
    return state.feed.items.items;
  });

  const FilterFunction = (BodyPart) => {
    if (BodyPart === "all") {
      return items;
    }
    return items.filter((item) => {
      if (item.body_location === BodyPart) {
        return true;
      }
    });
  };

  return (
    <Wrapper>
      <Label for="bodyPart">Choose a body part!</Label>
      <Select
        id="bodyPart"
        name="bodyPart"
        onChange={(ev) => {
          let selectedBodyPart = ev.target.value;
          let newItems = FilterFunction(selectedBodyPart);
          dispatch(PaginateItems(newItems));
        }}
      >
        <Option value="all">Select an Option</Option>
        <Option value="all">All Body Parts</Option>
        <Option value="Wrist">Wrist</Option>
        <Option value="Arms">Arms</Option>
        <Option value="Head">Head</Option>
        <Option value="Waist">Waist</Option>
        <Option value="Chest">Chest</Option>
        <Option value="Hands">Hands</Option>
        <Option value="Feet">Feet</Option>
      </Select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Label = styled.label`
  margin-top: 8px;
  margin-bottom: 2px;
  color: ${COLORS.BLUE.PRIMARY};
`;

const Select = styled.select`
  margin-bottom: 8px;
  border-radius: 15px;
  color: ${COLORS.BLUE.PRIMARY};
  background-color: ${COLORS.BACKGROUND.PRIMARY};
  padding: 3px 6px;
  border: 2px solid ${COLORS.PURPLE.SECONDARY};
`;

const Option = styled.option`
  font-weight: bold;
`;
