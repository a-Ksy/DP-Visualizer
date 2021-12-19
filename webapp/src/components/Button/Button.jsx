import "./Button.css";

const Button = (props) => {
  const { children, onClick, type } = props;
  return (
    <button
      className={`Button btn btn-primary ${type !== "" && type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
