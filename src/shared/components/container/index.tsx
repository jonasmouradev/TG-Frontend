import { FC, PropsWithChildren } from 'react';

const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-[90vh] shadow-md p-4 mb-4 flex flex-col gap-4 dark:border lg:border-l-white/20 lg:border-t-white/20 lg:border-b-white/20 lg:border-r-white/20 rounded-r-md">
      {children}
    </div>
  );
};

export default Container;
