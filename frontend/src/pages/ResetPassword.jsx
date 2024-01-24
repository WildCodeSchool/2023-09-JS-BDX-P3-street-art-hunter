import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ResetPasswordForm() {
  const [formValue, setFormValue] = useState({ username: "", password: "" });
  const [userExists, setUserExists] = useState(false);
  const navigate = useNavigate();

  const onChange = (event) => {
    setFormValue({ ...formValue, [event.target.name]: event.target.value });
  };

  const handleUsernameSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3310/api/check-user",
        {
          username: formValue.username,
        }
      );
      setUserExists(response.data.exists);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChangeSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3310/api/reset-password", {
        username: formValue.username,
        newPassword: formValue.password,
      });
      navigate("/connexion");
    } catch (error) {
      console.error(error);
    }
  };

  return !userExists ? (
    <div className="container mt-60">
      <div className="d-flex d-flex-center">
        <div className="allow-scroll">
          <form className="mb-20" onSubmit={handleUsernameSubmit}>
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
