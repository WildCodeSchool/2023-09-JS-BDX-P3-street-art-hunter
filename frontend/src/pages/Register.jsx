import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Button from "../components/Button";

export default function Register() {
  const { formData, registerUser, updateRegisterForm } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRegisterForm();
    registerUser();
  };

  return (
    <div>
      <h1 className="mb-20">Inscription</h1>
      <div className="container">
        <div className="allow-scroll">
          <form className="mb-20">
            <label htmlFor="pseudo" className="mb-10 ">
              Pseudo
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="pseudo"
                id="pseudo"
                value={formData.pseudo}
                onChange={(e) => updateRegisterForm("pseudo", e.target.value)}
              />
            </div>

            <label htmlFor="email" className="mb-10">
              Adresse email
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => updateRegisterForm("email", e.target.value)}
              />
            </div>

            <label htmlFor="postal" className="mb-10">
              Code Postal
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="postal"
                id="postal"
                value={formData.postal}
                onChange={(e) => updateRegisterForm("postal", e.target.value)}
              />
            </div>

            <label htmlFor="city" className="mb-10">
              Ville
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="city"
                id="city"
                value={formData.city}
                onChange={(e) => updateRegisterForm("city", e.target.value)}
              />
            </div>

            <label htmlFor="password" className="mb-10">
              Mot de passe
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => updateRegisterForm("password", e.target.value)}
              />
            </div>

            <label htmlFor="confirmation" className="mb-10">
              Confirmer le mot de passe
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="confirmation"
                id="confirmation"
                value={formData.confirmation}
                onChange={(e) =>
                  updateRegisterForm("confirmation", e.target.value)
                }
              />
            </div>
          </form>

          <Button
            type="Valider"
            className="button mb-20"
            onClick={handleSubmit}
          >
            Valider
          </Button>

          <Link to="/connexion">
            <p className="mb-10">
              Déjà inscrit ? <br />
              Connectez-vous !
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
