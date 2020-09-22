import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { useSelector, useDispatch } from "react-redux";
import { receiveItemsPaginated, receiveItems } from '../../actions'

//We want:
// 1. A dropdown menu that goes over each body part.
//2. When we change the value, it filters out the items in our feed to show only the approriate items.
//3. To display feed and pagination, we need to pass this filtered array to REDUX somehow (using daves new action)
//const { receiveItemsPaginated } = require("../../actions");
//Idea of how it would look

export const InputForm = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => {
    return state.feed.items.items;
  });
  const FilterFunction = (BodyPart) => {
    return items.filter((item) => {
      if (item.body_location === BodyPart) {
        return true;
      }
    });
  };

  // wrist arms head waist chest hands feet

  return (
    <Wrapper>
      <Label for="bodyPart">Choose a body part!</Label>
      <Select
        id="bodyPart"
        name="bodyPart"
        onChange={(ev) => {
          let selectedBodyPart = ev.target.value;
          console.log(selectedBodyPart);
          let newItems = FilterFunction(selectedBodyPart);
          dispatch(receiveItemsPaginated({items: newItems}));
        }}
      >
        <Option value="">Select an Option</Option>

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
`;

const Label = styled.label`
  margin-top: 8px;
  margin-bottom: 2px;
  color: ${COLORS.BLUE.PRIMARY};
`;

const Select = styled.select`
  margin-bottom: 8px;
`;

const Option = styled.option``;
