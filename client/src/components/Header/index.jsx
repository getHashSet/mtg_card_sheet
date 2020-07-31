import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <StyledRoot>
      <h2>60</h2>
      <h3>Total</h3>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  position: fixed;
  top: 0;
  right: 0;
`;
