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
