import { FC, ReactNode } from 'react';

interface ReadOnlyContainerProps {
  isReadOnly?: boolean;
  children: ReactNode;
}

const ReadOnlyContainer: FC<ReadOnlyContainerProps> = ({ isReadOnly = false, children }) =>
  isReadOnly ? (
    <div className="read-only-container" title="Read-only parameter">
      {children}
    </div>
  ) : (
    <>{children}</>
  );

export default ReadOnlyContainer;
