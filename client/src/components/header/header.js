import React from "react";
import styled from "styled-components";
import { COLORS } from "../styles/Colors";
// This is the full logo with text
import logo from "../../public/WE_LOGO.png";
// This is the IMG portion of logo only
import imgLogo from "../../public/IMG_Logo.png";
// React Icons being used
import { BiSearchAlt } from "react-icons/bi";
// import { FaShoppingCart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { InputForm } from "../homepage/InputForm";

import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [showForm, setShowForm] = useState(false);
  const displayForm = () => setShowForm(true);
  const hideForm = () => setShowForm(false);

  return (
    <Wrapper>
      <Logo src={logo} />
      <Nav>
        <A to="/">
          <ImgLogo src={imgLogo} />
        </A>
        <A href="#" /* onClick to do some searching */>
          <BiSearchAlt size={35} />
        </A>
        <A to="/cart" /* onClick to go to cart / cart modal */>
          <FaShoppingCart size={35} />
        </A>
      </Nav>
      <Input type="submit" value="Options" onClick={displayForm} />
      {showForm ? <InputForm /> : null}
      {showForm ? (
        <Input type="submit" value="Hide" onClick={hideForm} />
      ) : null}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: sticky;
  top: 0;
  border-bottom: 1px solid ${COLORS.BLUE.PRIMARY};
  z-index: 100;
`;

const Logo = styled.img`
  height: 150px;
  width: 150px;
`;

const Nav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const A = styled(Link)`
  color: ${COLORS.PURPLE.PRIMARY};
`;

const ImgLogo = styled.img`
  height: 35px;
`;

const Input = styled.input`
  background: ${COLORS.BLUE.PRIMARY};
  color: ${COLORS.BACKGROUND.PRIMARY};
  padding: 3px 8px;
  border-radius: 5px;
  border: none;
  margin-bottom: 10px;
`;
