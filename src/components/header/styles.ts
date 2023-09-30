import styled from "styled-components";

import { breakpoints } from "@/constants";

export const Container = styled.div`
  background-color: #45d0c1;
  padding: 1rem;
`;

export const Content = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
  gap: 0.5rem;
`;

export const LogoContainer = styled.div`
  align-self: center;
  flex-grow: 1;
`;

export const ContentSearch = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 2;
`;

export const ContentUser = styled.div`
  display: none;

  @media (min-width: ${breakpoints.desktopMD}) {
    display: block;
    color: #fff;
    flex-grow: 1;
  }
`;
