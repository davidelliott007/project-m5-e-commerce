import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../styles/Colors'
import { useDispatch } from "react-redux";
import { addItem } from '../../actions'


export const Btn = (item) => {
	const dispatch = useDispatch()

	return (
	<Button
          onClick={() => {
            dispatch(addItem(item));
          }}
        >
          Purchase
    </Button>
	)
}

const Button = styled.button`
border-radius: 15%;
  border: 1px solid ${COLORS.BLUE.PRIMARY};
  background-color: ${COLORS.PURPLE.SECONDARY};
  color: #fff;
  font-size: 15px;
  padding: 3px 10px;
`;