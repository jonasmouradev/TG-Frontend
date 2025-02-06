// Input.tsx
import { useState, InputHTMLAttributes } from "react";
import styled from "styled-components";
import { Label } from "./Label";

const InputContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }

  &:hover {
    border-color: #888;
  }

  &::placeholder {
    color: #aaa;
  }
`;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
}

const Input = ({ label, placeholder, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <InputContainer>
      {label && <Label>{label}</Label>}
      <StyledInput
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
        style={{
          borderColor: isFocused ? "#007bff" : "#ccc",
        }}
      />
    </InputContainer>
  );
};

export { Input, InputContainer };
