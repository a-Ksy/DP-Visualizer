import "./Container.css";

const Container = (props) => {
  const { children } = props;
  return <div className="Container container-lg">{children}</div>;
};

export default Container;
