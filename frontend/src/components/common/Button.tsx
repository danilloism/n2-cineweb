interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  label: string;
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button = ({
  label,
  type = 'button',
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
