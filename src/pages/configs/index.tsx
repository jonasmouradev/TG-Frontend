import { useState } from "react";
import * as S from "../../styles/formComponents/input/StyledInput";
import { FormButton } from "../../styles/formComponents/button/StyledButton";

const Configs: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <S.InputContainer>
        <S.Input
          label="Nome"
          placeholder="Digite seu nome"
          value={inputValue}
          onChange={handleChange}
        />
        <S.Input
          label="Email"
          placeholder="Digite seu email"
          value={inputValue}
          onChange={handleChange}
        />
      </S.InputContainer>
      <FormButton variant="contained">Teste</FormButton>
    </>
  );
};

export default Configs;
