export const ButtonComponent = ({ name, onClick, className }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <button className={className} onClick={handleClick}>
      {name}
    </button>
  );
};
