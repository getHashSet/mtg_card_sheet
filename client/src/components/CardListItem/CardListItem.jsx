import React from "react";
import styled from "styled-components";

export default function CardListItem() {
  return (
    <StyledRoot>
      <div className="left">image box </div>
      <div className="right">content box</div>
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  display: flex;
  justify-content: center;
  padding: 1em;
  background-color: #f1f1f1;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.5);

  &:hover {
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  }
`;
