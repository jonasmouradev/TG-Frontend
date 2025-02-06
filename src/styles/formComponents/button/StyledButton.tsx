import { Button } from "./styles";

type FormButtonProps = {
  variant: "text" | "contained" | "outlined";
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

const FormButton = ({ variant, children, disabled, icon }: FormButtonProps) => {
  return (
    <Button disabled={disabled} variant={variant}>
      {icon}
      {children}
    </Button>
  );
};

export { FormButton };
export type { FormButtonProps };
