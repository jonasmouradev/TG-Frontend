import styled from "styled-components";
import { FormButtonProps } from "./StyledButton";
import theme from "styled-theming";

const ButtonTextColor = theme("mode", { light: "#000", dark: "#fff" });

const variant = {
  text: {
    backgroundColor: "transparent",
    color: { ButtonTextColor },
    border: "none",
  },
  contained: {
    backgroundColor: "#007bff",
    color: { ButtonTextColor },
    border: "none",
  },
  outlined: {
    backgroundColor: "transparent",
    color: "#007bff",
    border: "1px solid #007bff",
  },
};

export const Button = styled.button<{ variant: FormButtonProps["variant"] }>`
  padding: 10px 20px;
  background-color: ${(props) => variant[props.variant].backgroundColor};
  color: ${(props) => variant[props.variant].color};
  border: ${(props) => variant[props.variant].border};
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #0056b3;
    color: white;
  }
`;
