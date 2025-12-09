interface InputProps {
  id?: string;
  label?: string;
  type: 'text' | 'number' | 'email' | 'password' | 'date';
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = ({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
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
        className="form-control"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
