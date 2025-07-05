import { useState } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export default function SettingsPage() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Configurações</h1>
      <div className="space-y-4">
        <Input
          placeholder="Digite seu nome"
          value={inputValue}
          onChange={handleChange}
        />
        <Input
          placeholder="Digite seu email"
          value={inputValue}
          onChange={handleChange}
        />
        <Button>Salvar</Button>
      </div>
    </div>
  );
}
