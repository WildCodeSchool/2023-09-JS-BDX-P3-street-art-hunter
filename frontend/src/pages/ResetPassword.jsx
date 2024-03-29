import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../context/LoginContext";

function ResetPasswordForm() {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();
  const { apiService } = useLogin();

  const onChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleUsernameAndEmailSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/check-user-and-mail`,
        {
          username: formValue.username,
          email: formValue.email,
        }
      );
      if (response.exists) {
        setUserExists(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/reset-password`,
        {
          username: formValue.username,
          email: formValue.email,
          newPassword: formValue.password,
        }
      );
      navigate("/connexion");
    } catch (error) {
      console.error(error);
    }
  };

  return !userExists ? (
    <div className="container mt-60">
      <div className="d-flex d-flex-center">
        <div className="allow-scroll">
          <form className="mb-20" onSubmit={handleUsernameAndEmailSubmit}>
            <label htmlFor="username" className="mb-10">
              Pseudo :{" "}
            </label>
            <div className="input mb-30">
              <input
                value={formValue.username}
                name="username"
                onChange={onChange}
                id="username"
                required
                type="text"
              />
            </div>
            <label htmlFor="email" className="mb-10">
              Email :{" "}
            </label>
            <div className="input mb-30">
              <input
                value={formValue.email}
                name="email"
                onChange={onChange}
                id="email"
                required
                type="text"
              />
            </div>
            <button className="button mb-10 mt-40" type="submit">
              Vérifier le nom d'utilisateur
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <div className="container mt-60">
      <div className="d-flex d-flex-center">
        <div>
          <div className="allow-scroll">
            <form className="mb-20" onSubmit={handlePasswordChangeSubmit}>
              <label htmlFor="password" className="mb-10">
                Nouveau mot de passe :{" "}
              </label>
              <div className="input">
                <input
                  value={formValue.password}
                  name="password"
                  onChange={onChange}
                  id="password"
                  required
                  type="password"
                  autoComplete="on"
                />
              </div>
              <button className="button mb-10 mt-40" type="submit">
                Changer le mot de passe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;
