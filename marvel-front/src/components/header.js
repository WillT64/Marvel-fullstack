import logoMarvel from "../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

import "./styles/header.scss";

const Header = () => {
  return (
    <header>
      <div className="header--menu">
        <div className="header--btn">
          <Link to="/characters">
            <button>Personnages</button>
          </Link>
        </div>
        <div className="header--btn">
          <Link to="/comics">
            <button>Comics</button>
          </Link>
        </div>
      </div>
      <div className="header--logo">
        <Link to="/">
          <img src={logoMarvel} alt="marvel" />
        </Link>
      </div>
      <div className="header--btn">
        <Link to="/favourites">
          <button>Favoris</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
