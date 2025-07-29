import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className="shadow-md dark:border border-2-gray-200 p-4 rounded-lg">{children}</div>;
};

export default Container;
