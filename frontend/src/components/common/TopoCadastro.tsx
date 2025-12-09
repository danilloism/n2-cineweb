interface TopoCadastroProps {
  titulo: string;
  botaoCadastroVisivel?: boolean;
  tituloBotaoCadastro?: string;
  onCadastrarClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  codigoIcone: string;
}

export const TopoCadastro = ({
  botaoCadastroVisivel = true,
  onCadastrarClick,
  titulo,
  codigoIcone,
  tituloBotaoCadastro,
}: TopoCadastroProps) => {
  return (
    <div className="row mb-4">
      <div className="col">
        <h1 className="mb-3">
          <i className={`bi ${codigoIcone} me-2`}></i>
          {titulo}
        </h1>
      </div>
      {botaoCadastroVisivel && (
        <div className="col-auto">
          <button
            className="btn btn-primary"
            onClick={onCadastrarClick}
          >
            <i className="bi bi-plus-circle me-2"></i>
            {tituloBotaoCadastro}
          </button>
        </div>
      )}
    </div>
  );
};
