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
        return !value || value.length < 6
          ? ["Le mot de passe doit contenir au moins 6 caractères."]
          : [];
      case "confirmation":
        return !value ? ["Les mots de passes ne sont pas identiques."] : [];
      default:
        return [];
    }
  };

  const checkUsernameExists = async (username) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/check-username?username=${username}`
    );
    const data = await response.json();
    return data.exists;
  };

  const checkEmailExists = async (email) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/check-email?email=${email}`
    );
    const data = await response.json();
    return data.exists;
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
      setAlertMessage(updatedAlerts);
      return;
    }

    const usernameExists = await checkUsernameExists(formData.username);
    const emailExists = await checkEmailExists(formData.email);

    if (usernameExists) {
      setAlertMessage((prevState) => ({
        ...prevState,
        username: ["Ce pseudo est déjà utilisé"],
      }));
      return;
    }

    if (emailExists) {
      setAlertMessage((prevState) => ({
        ...prevState,
        email: ["Cette adresse email est déjà utilisée"],
      }));
      return;
    }

    setAlertMessage(updatedAlerts);
    setFormData(formData);
    register(formData);
  };

  return (
    <div className="container allow-scroll-container ">
      <div className="d-flex d-flex-center">
        <div>
          <h1 className="mb-20">Inscription</h1>
          <div className="allow-scroll">
            <div>
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
                    onChange={(e) =>
                      updateRegisterForm("username", e.target.value)
                    }
                  />
                </div>
                {alertMessage.username.length > 0 && (
                  <div className="error-message ml-1 mb-10 tiny-text ml-1">
                    {alertMessage.username}
                  </div>
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
                    onChange={(e) =>
                      updateRegisterForm("email", e.target.value)
                    }
                  />
                </div>
                {alertMessage.email.length > 0 && (
                  <div className="error-message mb-10 tiny-text">
                    {alertMessage.email}
                  </div>
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
                    onChange={(e) =>
                      updateRegisterForm("postcode", e.target.value)
                    }
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
                    onChange={(e) =>
                      updateRegisterForm("password", e.target.value)
                    }
                  />
                </div>
                {alertMessage.password.length > 0 && (
                  <div className="error-message mb-10 tiny-text">
                    {alertMessage.password}
                  </div>
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
                  <div className="error-message mb-10 tiny-text">
                    {alertMessage.confirmation}
                  </div>
                )}
              </form>
              <Button
                type="submit"
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
      </div>
    </div>
  );
}
