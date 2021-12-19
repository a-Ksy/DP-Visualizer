/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Navbar.css";
import logo from "../../assets/logo.png";

const Navbar = (props) => {
  return (
    <div className="Navbar navbar">
      <a class="navbar-brand" href="#">
        <img src={logo} alt="" width="40" height="40" />
        DP Visualizer
      </a>
    </div>
  );
};

export default Navbar;
