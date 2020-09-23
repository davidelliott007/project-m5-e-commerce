import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  requestItems,
  receiveItems,
  catchError,
  receiveItemsPaginated,
} from "../../actions";

import { getPages, getPageNumber } from "../../reducers/FeedReducer.js";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import FiveHundred from "../errrorPage/FiveHundred";

export const Feed = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.feed;
  });

  const pages = useSelector(getPages);
  const pageNumber = useSelector(getPageNumber);

  const { status } = data;

  const [currentPage, setCurrentPage] = React.useState(0);

  React.useEffect(() => {
    dispatch(requestItems());
    fetch("/bigData")
      .then((res) => res.json())
      .then((json) => {
        dispatch(receiveItemsPaginated(json));
      })
      .catch((err) => {
        dispatch(catchError(err));
      });
  }, []);

  if (status === "error") {
    // console.log(errorState);
    return (
      <div>
        <FiveHundred />
      </div>
    );
  }

  if (!data.items.items) {
    return (
      <div style={{ marginTop: "50px" }}>
        {/* Loading Style */}
        <Loader
          type="Grid"
          color={COLORS.BLUE.PRIMARY}
          m
          height={80}
          width={80}
        />
      </div>
    );
  }
  if (data.items !== undefined) {
    return pages[pageNumber].map((item) => {
      return (
        <div>
          <Li key={item.name}>
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
            <div>
              {item.numInStock > 0 ? (
                <Img src={item.imageSrc} />
              ) : (
                <Img src={item.imageSrc} style={{ filter: "grayscale(100%)" }} />
              )}
            </div>

            <Location>{item.body_location} - </Location>
            <Category>{item.category}</Category>
            <StockCont>
              <Stock>
                {/* If Stock is 0, it will simply display 'Out Of Stock */}
                {item.numInStock > 0 ? `${item.numInStock} Left in Stock` : "Out of Stock!"}
              </Stock>
              {/* Add to cart button wont display if out off stock */}
            </StockCont>

            {item.numInStock > 0 ? (
              <Button
                onClick={() => {
                  dispatch(addItem(item));
                }}
              >
                {" "}
                Add To Cart{" "}
              </Button>
            ) : null}

            {/* this */}
            {/* <Button
          onClick={() => {
            dispatch(addItem(item));
          }}
          >
          Purchase
        </Button> */}
          </Li>
        </div>
      );
    });
  }
};

const Li = styled.li`
  margin-top: 15px;
  border-top: 1px solid ${COLORS.BLUE.PRIMARY};
`;

const Name = styled.p`
  font-weight: bold;
  margin-top: 10px;
  margin-top: 8px;
`;

const Price = styled.p`
  font-weight: bold;
  color: ${COLORS.BLUE.PRIMARY};
`;

const Location = styled.span`
  color: ${COLORS.BLUE.PRIMARY};
`;

const Img = styled.img`
  border-radius: 15px;
  height: 155px;
  margin: 5px;
`;

const Category = styled.span`
  color: ${COLORS.BLUE.PRIMARY};
`;

const StockCont = styled.div`
  display: flex;
  flex-direction: row;
  color: ${COLORS.BLUE.PRIMARY};
  align-items: center;
  justify-content: center;
`;

const Stock = styled.p`
  font-style: italic;
  margin: 2px;
`;

const Button = styled.button`
  border-radius: 15%;
  border: 1px solid ${COLORS.BLUE.PRIMARY};
  background-color: ${COLORS.PURPLE.SECONDARY};
  color: #fff;
  font-size: 15px;
  padding: 3px 10px;
`;
