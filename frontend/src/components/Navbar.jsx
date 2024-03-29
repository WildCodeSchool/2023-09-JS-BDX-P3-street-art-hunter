import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../context/LoginContext";
// import { useUserContext } from "../context/userContext";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const { isUserConnected, isUserAdmin } = useLogin();
  // const { isLocalStorageKeyExists, keyToCheck } = useUserContext();

  const handleLinkClick = () => {
    setOpenMenu(false);
  };

  return (
    <footer className={`burger-menu${openMenu ? " active" : ""}`}>
      <button
        className={`burger-button${openMenu ? " active" : ""}`}
        onClick={() => setOpenMenu(!openMenu)}
        type="button"
        aria-label="Toggle Menu"
      />

      {location.pathname === "/map" ? (
        <button
          className="exclamation-button"
          type="button"
          aria-label="Toggle report"
        />
      ) : null}

      <nav>
        <Link
          to="/map"
          className={location.pathname === "/map" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Accueil
        </Link>
        <Link
          to="/galerie/arts"
          className={
            location.pathname.endsWith("/galerie/arts") ||
            location.pathname.endsWith("/galerie/artistes")
              ? "active"
              : ""
          }
          onClick={handleLinkClick}
        >
          Galerie
        </Link>
        {isUserConnected() && (
          <Link
            to="/mon-compte/informations"
            className={
              location.pathname.endsWith("/mon-compte/informations") ||
              location.pathname.endsWith("/mon-compte/arts")
                ? "active"
                : ""
            }
            onClick={handleLinkClick}
          >
            Mon compte
          </Link>
        )}
        {!isUserConnected() && (
          <Link
            to="/connexion"
            className={location.pathname === "/connexion" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Connexion
          </Link>
        )}
        {!isUserConnected() && (
          <Link
            to="/inscription"
            className={location.pathname === "/inscription" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Inscription
          </Link>
        )}
        <Link
          to="/classement"
          className={location.pathname === "/classement" ? "active" : ""}
          onClick={handleLinkClick}
        >
          Classement
        </Link>
        {isUserAdmin() && (
          <Link
            to="/administration"
            className={location.pathname === "/administration" ? "active" : ""}
            onClick={handleLinkClick}
          >
            Administration
          </Link>
        )}
      </nav>
    </footer>
  );
}
