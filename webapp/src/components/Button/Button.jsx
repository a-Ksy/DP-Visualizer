import "./Button.css";

const Button = (props) => {
  const { children, onClick, type, size } = props;
  return (
    <button
      className={`Button btn btn-primary ${type !== "" && type} ${
        size !== "" && size
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
