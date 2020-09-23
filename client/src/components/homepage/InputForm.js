import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";

export const InputForm = () => {
  const test = () => {
    alert("test");
  };

  return (
    <Form>
      <Input
        type="radio"
        id="wrist"
        name="equipment"
        value="wrist"
        onClick={test}
      />
      <Label for="wrist">Wrist</Label>
      <Input
        type="radio"
        id="arms"
        name="equipment"
        value="arms"
        onClick={test}
      />
      <Label for="arms">Arms</Label>
      <Input
        type="radio"
        id="head"
        name="equipment"
        value="head"
        onClick={test}
      />
      <Label for="head">Head</Label>
      <Input
        type="radio"
        id="waist"
        name="equipment"
        value="waist"
        onClick={test}
      />
      <Label for="waist">Waist</Label>
      <Input
        type="radio"
        id="chest"
        name="equipment"
        value="chest"
        onClick={test}
      />
      <Label for="chest">Chest</Label>
      <Input
        type="radio"
        id="hands"
        name="equipment"
        value="hands"
        onClick={test}
      />
      <Label for="hands">Hands</Label>
      <Input
        type="radio"
        id="feet"
        name="equipment"
        value="feet"
        onClick={test}
      />
      <Label for="feet">Feet</Label>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-top: 3px;
  margin-bottom: 8px;
  color: ${COLORS.BLUE.PRIMARY};
`;

const Input = styled.input``;
