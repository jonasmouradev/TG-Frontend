import { FC, PropsWithChildren } from 'react';

const Accordion: FC<PropsWithChildren> = ({ children }) => {
  return <div className="border border-gray-300 rounded-md">{children}</div>;
};

export default Accordion;
