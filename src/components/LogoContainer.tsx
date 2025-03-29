import { Link } from "react-router-dom";
import Logo from "../assets/svg/logo.png";

const LogoContainer = () => {
  return (
    <Link to={"/"}>
      <img
        src={Logo}
        className="w-[75px] object-cover"
        alt="Logo"
        draggable="false"
      />
    </Link>
  );
};

export default LogoContainer;
