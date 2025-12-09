interface InputProps {
  id?: string;
  label?: string;
  type?: 'text' | 'number' | 'email' | 'password' | 'date';
  placeholder?: string;
  value: string;
  className?: string;
  name?: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

export const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  name,
}: InputProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor={id}
          className="form-label"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={`form-control ${className}`}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
      />
    </>
  );
};
