import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="max-w-full h-full overflow-hidden shadow-md dark:border border-gray-800 p-4 rounded-lg mb-4">
      {children}
    </div>
  );
};

export default Container;
