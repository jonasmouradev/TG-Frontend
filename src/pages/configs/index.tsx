import { useState } from 'react';
import { Button } from '@/styles/styledComponents/Button';
import { Input } from '@/styles/styledComponents/Input';

const Configs: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Input
        placeholder='Digite seu nome'
        value={inputValue}
        onChange={handleChange}
      />
      <Input
        placeholder='Digite seu email'
        value={inputValue}
        onChange={handleChange}
      />
      <Button>Salvar</Button>
    </>
  );
};

export default Configs;
