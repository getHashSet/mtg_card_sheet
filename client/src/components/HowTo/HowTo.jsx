import React from "react";
import styled from "styled-components";

export default function HowTo() {
  return (
    <StyledRoot>
      <h2>Deck</h2>
      <p>manaleaks.com/deck/yourdeckname</p>
      <h2>Back</h2>
      <p>manaleaks.com/back</p>
      <h2>Single Card Upload</h2>
      <p>manaleaks.com/card/cardname</p>
      <h2>Tokens</h2>
      <p>manaleaks.com/token/tokenname</p>
    </StyledRoot>
  );
}

const StyledRoot = styled.section`
  padding: 0;
  margin: 0;
`;
