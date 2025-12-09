interface AlertaSucessoProps {
  msg: string;
  onCloseClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const AlertaSucesso = ({ msg, onCloseClick }: AlertaSucessoProps) => {
  return (
    <div
      className="alert alert-success alert-dismissible fade show"
      role="alert"
    >
      {msg}
      <button
        type="button"
        className="btn-close"
        onClick={onCloseClick}
      ></button>
    </div>
  );
};
