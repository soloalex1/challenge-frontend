import styled from "styled-components";

export const ListContainer = styled.ul`
  position: absolute;
  top: 60px;
  background-color: white;
  list-style-type: none;
  padding: 12px;
  z-index: 20;
  border-radius: 8px;

  li {
    color: black;
    padding: 8px;
    background-color: transparent;
    transition: all 100ms ease-in-out;

    &:hover {
      background-color: #45d0c169;
    }
  }
`;
