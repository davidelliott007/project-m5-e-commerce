import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
import { FaCartPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addItem } from "../../actions";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export const Feed = () => {
  const dispatch = useDispatch();

  const [data, setData] = React.useState();

  React.useEffect(() => {
    fetch("/bigData")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  if (!data) {
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
  console.log(data);
  return data.items.map((item) => {
    return (
      <Li>
        <Name>{item.name}</Name>
        <Price>{item.price}</Price>
        <div>
          <Img src={item.imageSrc} />
        </div>

        <Location>{item.body_location} - </Location>
        <Category>{item.category}</Category>
        <StockCont>
          <Stock>
            {/* If Stock is 0, it will simply display 'Out Of Stock */}
            {item.numInStock > 0 ? item.numInStock : "Out of Stock!"}
            {item.numInStock > 0 ? " Left in Stock!" : null}
          </Stock>
          {/* Add to cart button wont display if out off stock */}
        </StockCont>

        <Button
          onClick={() => {
            dispatch(addItem(item));
          }}
        >
          Purchase
        </Button>
      </Li>
    );
  });
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
