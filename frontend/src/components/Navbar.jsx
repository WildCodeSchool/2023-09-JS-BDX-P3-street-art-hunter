import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="container container-big">
      <nav>
        <Link to="/">Accueil</Link>
        <Link to="/galerie">Galerie</Link>
        <Link to="/mon-compte">Mon compte</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription">Incription</Link>
        <Link to="/classement">Classement</Link>
        <Link to="/administration">Administration</Link>
        <Link to="/style">Style</Link>
      </nav>
    </header>
  );
}
