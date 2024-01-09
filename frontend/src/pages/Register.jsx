import axios from "axios";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

export default function Register() {
  const {
    formData,
    alertMessage,
    setAlertMessage,
    updateRegisterForm,
    navigateToLogin,
    isEmailValid,
  } = useUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateRegisterForm();
    setAlertMessage({
      username: [],
      email: [],
      postcode: [],
      city: [],
      password: [],
      confirmation: [],
    });

    if (!formData.username || !formData.email || !formData.password) {
      setAlertMessage((prev) => ({
        ...prev,
        username: ["Ce champ est requis."],
      }));
    }

    if (formData.username.length > 20) {
      setAlertMessage((prev) => ({
        ...prev,
        username: ["Le pseudo ne doit pas dépasser 20 caractères."],
      }));
    }

    if (!isEmailValid(formData.email)) {
      setAlertMessage((prev) => ({
        ...prev,
        email: ["Le format de l'email est incorrect."],
      }));
    }

    if (formData.password.length < 6) {
      setAlertMessage((prev) => ({
        ...prev,
        password: ["Le mot de passe doit contenir minimum 6 caractères."],
      }));
    }

    try {
      const response = await axios.post(
        "http://localhost:3310/api/users/",
        formData
      );
      console.info(response.data);
    } catch (error) {
      console.error(error);
    }
    navigateToLogin();
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
              {alertMessage.username &&
                alertMessage.username.map((message) => (
                  <ErrorMessage key={message.id}>
                    {message.username}
                  </ErrorMessage>
                ))}
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
