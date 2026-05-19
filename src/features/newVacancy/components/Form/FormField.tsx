import { Input } from '@shared/index';

const FormField = ({ title, placeholder }: { title: string; placeholder: string }) => {
  return (
    <div className="flex flex-col gap-2">
      <h1>{title}</h1>
      <Input placeholder={placeholder} />
    </div>
  );
};

export default FormField;
