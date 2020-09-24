import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { useSelector } from "react-redux";

const TypeAhead = ({ maxHeight }) => {
  let allItems = useSelector((state) => state.feed.items.items);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
    0
  );
  if (allItems === undefined) {
    allItems = [];
  }

  let matchedItemsArray = allItems.filter((item) => {
    let LowerCaseSearch = searchTerm.toLowerCase();
    let itemLowerCaseName = item.name.toLowerCase();
    if (
      searchTerm !== "" &&
      searchTerm.length >= 2 &&
      itemLowerCaseName.includes(LowerCaseSearch)
    ) {
      return true;
    } else {
      return false;
    }
  });

  matchedItemsArray = matchedItemsArray.slice(0, 5);

  console.log(matchedItemsArray);

  let isMatchedItemsArrayFull = matchedItemsArray.length > 0;
  return (
    <Wrapper maxHeight={maxHeight}>
      <InnerWrapper>
        <Input
          value={searchTerm}
          onChange={(ev) => {
            setSearchTerm(ev.target.value);
          }}
        />
      </InnerWrapper>
      <DropDown>
        {matchedItemsArray.map((item, index) => {
          let lowerCaseItemName = item.name.toLowerCase();
          let lowerCaseSearchTerm = searchTerm.toLowerCase();
          let indexOfSearch = lowerCaseItemName.indexOf(lowerCaseSearchTerm);
          let indexToSlice = indexOfSearch;
          let firstSlice = item.name.slice(0, indexToSlice);
          let secondSlice = item.name.slice(indexToSlice);
          return (
            <li>
              <span>
                {`${firstSlice}`}
                <Prediction>{`${secondSlice}`}</Prediction>
              </span>
            </li>
          );
        })}
      </DropDown>
    </Wrapper>
  );
};
export default TypeAhead;

const Wrapper = styled.div`
  transition: max-height 0.4s ease-in-out;
  height: auto;
  max-height: ${(props) => {
    return props.maxHeight;
  }};
  overflow: hidden;
  margin: 0;
  width: 100%;
`;

const InnerWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: center;
`;

const Input = styled.input`
  width: 30%;
  border: 1px solid ${COLORS.PURPLE.PRIMARY};
  height: 30px;
  border-radius: 3px;
`;

const DropDown = styled.div``;

const Prediction = styled.span`
  font-weight: 700;
`;
