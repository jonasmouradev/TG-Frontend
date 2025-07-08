import styled from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  height?: string;
  width?: string;
  border?: string;
  borderRadius?: string;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  margin?: string;
  fontSize?: string;
  fontWeight?: string;
  fontFamily?: string;
  textAlign?: string;
  boxShadow?: string;
  outline?: string;
  cursor?: string;
}

export const Input = styled.input<InputProps>`
  height: ${(props) => props.height || "40px"};
  width: ${(props) => props.width || "100%"};
  border: ${(props) => props.border || "1px solid #ccc"};
  border-radius: ${(props) => props.borderRadius || "5px"};
  background-color: ${(props) => props.backgroundColor || "transparent"};
  color: ${(props) => props.color || "black"};
  padding: ${(props) => props.padding || "1rem"};
`;
