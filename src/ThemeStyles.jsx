import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#f5f5f5")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  padding: 16px;
`;

export const Button = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#ccc")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;

export const NavbarContainer = styled.nav`
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#f5f5f5")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  padding: 0px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
`;

// sidebar container
export const DrawerContainer = styled.div`
  width: 200px;
  flex-shrink: 0;
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#f5f5f5")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  height: 100%;
  padding-top: 64px;
  .MuiSvgIcon-root {
    color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  }
`;

export const NavButton = styled.button`
  background-color: ${({ theme }) => (theme === "dark" ? "#333" : "#ccc")};
  color: ${({ theme }) => (theme === "dark" ? "#fff" : "#333")};
  border: none;
  padding: 8px 16px;
  cursor: pointer;
`;
