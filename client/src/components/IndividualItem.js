import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addItem, catchError } from "../actions";
import { COLORS } from "./styles/Colors";
import Loader from "react-loader-spinner";

const IndividualItem = () => {
  const dispatch = useDispatch();
  let { itemId } = useParams();

  const [item, setItemData] = React.useState("");
  const [companies, setCompaniesData] = React.useState();
  const [loadStatus, setLoadStatus] = React.useState("loading");
  const [loadCompanyStatus, setLoadCompanyStatus] = React.useState("loading");

  React.useEffect(() => {
    fetch(`/items/${itemId}`, {
      method: "GET",
      header: {
        Application: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.item);
        setItemData(data.item);
        setLoadStatus("loaded");
      })
      .catch((err) => dispatch(catchError(err)));
  }, []);

  React.useEffect(() => {
    fetch("/companies", {
      method: "GET",
      header: {
        Application: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCompaniesData(data);
        setLoadCompanyStatus("loaded");
      })
      .catch((err) => dispatch(catchError(err)));
  }, []);

  if (loadStatus === "loaded" && loadCompanyStatus === "loaded") {
    {
      let company = companies.sorted_companies.find((company) => {
        return company._id === item.companyId;
      });

      return (
        <Wrapper>
          <Img src={item.imageSrc} />
          <Product>
            <Name>{item.name}</Name>
            <Price>{item.price}</Price>
            <Description>
              <div>Category: {item.category}</div>
              <div>
                Company: <a href={company.url}>{company.name}</a>{" "}
              </div>
            </Description>
          </Product>
          <StockCount>Only {item.numInStock} left in stock!!</StockCount>
          <Button
            onClick={(ev) => {
              ev.stopPropagation();
              dispatch(addItem(item));
            }}
          >
            Add To Cart
          </Button>
        </Wrapper>
      );
    }
  } else {
    return (
      <Wrapper>
        <Loader
          type="Grid"
          color={COLORS.BLUE.PRIMARY}
          m
          height={80}
          width={80}
        />
      </Wrapper>
    );
  }
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  height: 335px;
  width: 350px;
  border-radius: 15px;
`;

const Name = styled.p`
  font-weight: bold;
  text-align: center;
`;

const Price = styled.div`
  text-align: center;
  padding: 10px;
  font-weight: bold;
  font-size: 20px;
`;

const Product = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  padding: 15px;
  font-size: 13px;
`;

const StockCount = styled.div`
  color: ${COLORS.BLUE.PRIMARY};
  font-style: italic;
  padding-bottom: 10px;
  font-weight: bold;
`;

const Button = styled.button`
  border: 1px solid ${COLORS.BLUE.PRIMARY};
  background-color: ${COLORS.PURPLE.SECONDARY};
  color: #fff;
  font-size: 15px;
  padding: 3px 10px;
  font-size: bold;
  width: 100%;
  height: 35px;
`;

export default IndividualItem;
