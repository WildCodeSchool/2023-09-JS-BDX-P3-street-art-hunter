import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { useLogin } from "../context/LoginContext";

export default function Register() {
  const { register } = useLogin();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    postcode: "",
    city: "",
    password: "",
    confirmation: "",
  });

  const updateRegisterForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [alertMessage, setAlertMessage] = useState({
    username: [],
    email: [],
    postcode: [],
    city: [],
    password: [],
    confirmation: [],
  });

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "username":
        return !value ? ["Champ requis"] : [];
      case "email":
        return !value || !isEmailValid(value) ? ["Adresse email invalide"] : [];
      case "password":
        return !value
          ? ["Le mot de passe doit contenir minimum 6 caractères."]
          : [];
      case "confirmation":
        return !value ? ["Les mots de passes ne sont pas identiques."] : [];
      default:
        return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAlerts = {};
    for (const fieldName of Object.keys(formData)) {
      const fieldErrors = validateField(fieldName, formData[fieldName]);
      updatedAlerts[fieldName] = fieldErrors;
    }
    if (formData.password !== formData.confirmation) {
      updatedAlerts.confirmation = ["Les mots de passe ne correspondent pas"];
    }
    setAlertMessage(updatedAlerts);
    updateRegisterForm();
    register(formData);
  };

  return (
    <div>
      <h1 className="mb-20">Inscription</h1>
      <div className="container">
        <div className="allow-scroll">
          <form className="mb-20">
            <label htmlFor="username" className="mb-10 ">
              Pseudo
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={(e) => updateRegisterForm("username", e.target.value)}
              />
            </div>
            {alertMessage.username.length > 0 && (
              <div className="error-message">{alertMessage.username}</div>
            )}

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
            {alertMessage.email.length > 0 && (
              <div className="error-message">{alertMessage.email}</div>
            )}
            <label htmlFor="postcode" className="mb-10">
              Code Postal
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="postcode"
                id="postcode"
                value={formData.postcode}
                onChange={(e) => updateRegisterForm("postcode", e.target.value)}
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
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => updateRegisterForm("password", e.target.value)}
              />
            </div>
            {alertMessage.password.length > 0 && (
              <div className="error-message">{alertMessage.password}</div>
            )}

            <label htmlFor="confirmation" className="mb-10">
              Confirmer le mot de passe
            </label>
            <div className="input mb-10">
              <input
                type="password"
                name="confirmation"
                id="confirmation"
                value={formData.confirmation}
                onChange={(e) =>
                  updateRegisterForm("confirmation", e.target.value)
                }
              />
            </div>
            {alertMessage.confirmation.length > 0 && (
              <div className="error-message">{alertMessage.confirmation}</div>
            )}
          </form>
          <Button type="submit" className="button mb-20" onClick={handleSubmit}>
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
