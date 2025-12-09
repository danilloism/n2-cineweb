import type { FunctionComponent, PropsWithChildren } from 'react';

export const Card: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body text-center">{children}</div>
      </div>
    </div>
  );
};
