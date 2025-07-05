import styled from 'styled-components';
import { Button } from '@/styles/styledComponents/Button';

export const Redirect = styled(Button)`
  background-color: transparent;
  color: #1e40af;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: #122f8d;
  }
`;

interface RedirectProps {
  navigate: () => void;
  path: string;
  text: string;
}

const RedirectLink: React.FC<RedirectProps> = ({ navigate, text }) => {
  return <Redirect onClick={() => navigate()}>{text}</Redirect>;
};

export default RedirectLink;
