import type { FunctionComponent, PropsWithChildren } from 'react';
import { Button } from './Button';

interface CardDeletavelProps {
  onDelete: React.MouseEventHandler<HTMLButtonElement> | undefined;
  titulo: string;
}

export const CardDeletavel: FunctionComponent<
  PropsWithChildren<CardDeletavelProps>
> = ({ onDelete, titulo, children }) => {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          {children}
        </div>
        <div className="card-footer bg-transparent">
          <Button
            variant="danger"
            className="btn-sm w-100"
            onClick={onDelete}
          >
            <i className="bi bi-trash me-2"></i>
            Deletar
          </Button>
        </div>
      </div>
    </div>
  );
};
