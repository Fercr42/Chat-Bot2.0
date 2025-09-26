export const InputComponent = ({ value, onChange, className }) => {
  const handleChange = (e) => {
    onChange(e);
  };
  return (
    <textarea
      className={className}
      value={value}
      onChange={handleChange}
      rows={4}
    />
  );
};
