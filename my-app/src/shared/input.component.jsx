export const InputComponent = ({ value, onChange, className }) => {
  const handleChange = (e) => {
    onChange(e);
  };
  return <input className={className} value={value} onChange={handleChange} />;
};
