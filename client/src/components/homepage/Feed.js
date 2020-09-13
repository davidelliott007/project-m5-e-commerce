import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";

export const Feed = () => {
    // This is simply Test data, will be replace by a fetch to GET endpoint
  const data = [
    {
      name: "Barska GB12166 Fitness Watch with Heart Rate Monitor",
      price: "$49.99",
      body_location: "Wrist",
      category: "Fitness",
      _id: 6543,
      imageSrc:
        "data:image/jpeg;base64,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",
      numInStock: 9,
      companyId: 19962,
    },
    {
      name: "Belkin GS5 Sport Fit Armband, Black F8M918B1C00",
      price: "$24.99",
      body_location: "Arms",
      category: "Fitness",
      _id: 6544,
      imageSrc:
        "data:image/jpeg;base64,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",
      numInStock: 9,
      companyId: 16384,
    },
  ]; // Fetch data here into a variable
  return data.map((item) => {
    return (
      <Li>
        <Name>{item.name}</Name>
        <Price>{item.price}</Price>
        <div>
          <Img src={item.imageSrc} />
        </div>

        <Location>{item.body_location} - </Location>
        <Category>{item.category}</Category>

        <Stock>
            {/* If Stock is 0, it will simply display 'Out Of Stock */}
          {item.numInStock > 0 ? item.numInStock : "Out of Stock!"}
          {item.numInStock > 0 ? " Left in Stock!" : null}
        </Stock>
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
`;

const Location = styled.span``;

const Img = styled.img`
  border-radius: 15px;
  height: 155px;
  margin: 5px;
`;

const Category = styled.span``;

const Stock = styled.p`
  font-style: italic;
  margin: 2px;
`;