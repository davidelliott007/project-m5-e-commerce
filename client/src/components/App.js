import React, { useState, useEffect } from 'react';
import styled from "styled-components"
import { COLORS } from './styles/Colors'
import GlobalStyles from './styles/GlobalStyles'

function App() {
  const [bacon, setBacon] = useState(null);

  useEffect(() => {
    fetch('/bacon')
      .then(res => res.json())
      .then(data => setBacon(data));
  }, []);

  return (
    <>
    <Test>Hi There</Test>
    <div>{bacon ? bacon : `...where's my stuff?...`}</div>
    <GlobalStyles />
    </>
  );
}

const Test = styled.p`
  color: ${COLORS.PURPLE.PRIMARY};
  font-size: 100px;
`;

export default App;
