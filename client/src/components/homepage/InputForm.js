import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";

//We want:
// 1. A dropdown menu that goes over each body part.
//2. When we change the value, it filters out the items in our feed to show only the approriate items.
//3. To display feed and pagination, we need to pass this filtered array to REDUX somehow (using daves new action)
//const { receiveItemsPaginated } = require("../../actions");
//Idea of how it would look
// const FilterFunction = (BodyPart) => {
//   return items.filter((item) => {
//     if (item.body_location === BodyPart) {
//       return true;
//     }
//   });
// };
// <form
//   onChange={(ev) => {
//     let selectedBodyPart = ev.target.value;
//     let newItems = FilterFunction(selectedBodyPart);
//     dispatch(receiveItemsPaginated(newItems));
//   }}
// ></form>;

export const InputForm = () => {
  const test = () => {
    alert("test");
  };
// wrist arms head waist chest hands feet
  return (
    <Wrapper>
      <Label for="bodyPart">Choose a body part!</Label>
      <Select id="bodyPart" name="bodyPart">
        <Option value="wrist">Wrist</Option>
        <Option value="arms">Arms</Option>
        <Option value="head">Head</Option>
        <Option value="waist">Waist</Option>
        <Option value="chest">Chest</Option>
        <Option value="hands">Hands</Option>
        <Option value="feet">Feet</Option>
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
