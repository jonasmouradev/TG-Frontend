import { Button } from '@/shared';

const FormButton = ({ text, onClick }: { text: string; onClick: () => void }) => {
  return <Button onClick={onClick}>{text}</Button>;
};

export default FormButton;
