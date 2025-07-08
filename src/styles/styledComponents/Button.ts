import styled from "styled-components";

interface ButtonProps {
  $height?: string;
  $width?: string;
  $backgroundColor?: string;
  $color?: string;
  $borderRadius?: string;
  $border?: string;
}

export const Button = styled.button<ButtonProps>`
  height: ${(props) => props.$height || "40px"};
  width: ${(props) => props.$width || "100%"};
  background-color: ${(props) => props.$backgroundColor || "black"};
  color: ${(props) => props.$color || "white"};
  border-radius: ${(props) => props.$borderRadius || "5px"};
  border: ${(props) => props.$border || "none"};
  cursor: pointer;
`;
