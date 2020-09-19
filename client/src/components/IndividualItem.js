import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { addItem, requestItems, receiveItems, catchError } from "../actions";

const IndividualItem = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    fetch(`/items/${itemId}`, {
      method: "GET",
      header: {
        Application: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(receiveItems(data)))
      .catch((err) => dispatch(catchError(err)));
  }, []);
};
