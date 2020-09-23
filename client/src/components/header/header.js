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

import { Link } from "react-router-dom";
const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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

export default Header;
