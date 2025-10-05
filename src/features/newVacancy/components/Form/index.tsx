import FormButton from './FormButton';
import FormTitle from './FormTitle';
import FormField from './FormField';

const Form = ({ children }: { children: React.ReactNode }) => {
  return <div className="m-4">{children}</div>;
};

Form.Button = FormButton;
Form.Title = FormTitle;
Form.Field = FormField;

export default Form;
