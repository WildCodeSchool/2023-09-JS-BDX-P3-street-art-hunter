import { useState } from "react";
import Button from "../components/Button";
import { useAdminContext } from "../context/AdminContext";
import { useLogin } from "../context/LoginContext";

export default function UpdateUser() {
  const { logout } = useLogin();

  const { updateUser } = useAdminContext();
  const { user } = useLogin();

  const [formData, setFormData] = useState({
    username: user?.username ?? "",
    email: user?.email ?? "",
    postcode: user?.postcode ?? "",
    city: user?.city ?? "",
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
    updateUser(user.id, formData);
    logout();
  };

  return (
    <div className="container allow-scroll-container ">
      <h1 className="mb-20">Modifier le compte</h1>
      <div className="allow-scroll">
        <div className="container d-flex d-flex-center">
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => updateRegisterForm("email", e.target.value)}
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
              <div className="error-message mb-10 tiny-text">
                {alertMessage.password}
              </div>
            )}

            <label htmlFor="confirmation" className="mb-10">
              Confirmer le mot de passe
            </label>
            <div className="input mb-20">
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
            <Button type="submit" className="button">
              Valider
            </Button>
            {alertMessage.confirmation.length > 0 && (
              <div className="error-message mb-10 tiny-text">
                {alertMessage.confirmation}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
