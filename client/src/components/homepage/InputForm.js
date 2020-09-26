import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { updatePageToView, PaginateItems, updateFilter } from "../../actions";
import { FilteredItemsByBody } from "../../filterHelpers";

export const InputForm = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => {
    return state.feed.items.items;
  });
  let filter = useSelector((state) => state.feed.filter);
  if (filter === null) {
    filter = undefined;
  }
  return (
    <Wrapper>
      <Label for="bodyPart">Choose a body part!</Label>
      <Select
        id="bodyPart"
        name="bodyPart"
        value={filter}
        onChange={(ev) => {
          let selectedBodyPart = ev.target.value;
          dispatch(updateFilter(selectedBodyPart));
          dispatch(PaginateItems(FilteredItemsByBody(selectedBodyPart, items)));
          dispatch(updatePageToView(0));
        }}
      >
        <Option value="default">Select an Option</Option>
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
