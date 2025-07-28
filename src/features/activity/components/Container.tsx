import { ReactNode } from 'react';

const Container = ({ children }: { children: ReactNode }) => {
  return <div className="shadow-md dark:border border-2-gray-200 p-4 rounded-lg">{children}</div>;
};

export default Container;
