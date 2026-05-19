import FormButton from './FormButton';
import FormTitle from './FormTitle';
import FormField from './FormField';

const Form = ({ children }: { children: React.ReactNode }) => {
  return <form className="m-4">{children}</form>;
};

Form.Button = FormButton;
Form.Title = FormTitle;
Form.Field = FormField;

export default Form;
