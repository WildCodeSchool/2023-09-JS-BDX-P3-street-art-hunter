import { useState } from "react";
import { Link } from "react-router-dom";
// import { useUserContext } from "../context/userContext";
import { useLogin } from "../context/LoginContext";

export default function Login() {
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const { login } = useLogin();

  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <>
      <h1>Connexion</h1>
      <div className="container mt-60">
        <div className="allow-scroll">
          <form className="mb-20">
            <label htmlFor="pseudo" className="mb-10">
              Pseudo :{" "}
            </label>
            <div className="input mb-30">
              <input
                value={formValue.pseudo}
                name="username"
                onChange={onChange}
                id="username"
                required
                label="Pseudo"
                type="text"
              />
            </div>
            <label htmlFor="password" className="mb-10">
              Mot de passe :{" "}
            </label>
            <div className="input">
              <input
                value={formValue.password}
                name="password"
                onChange={onChange}
                id="password"
                required
                label="Mot de passe"
                type="password"
                autoComplete="on"
              />
            </div>
          </form>
          <button
            className="button mb-10 mt-40"
            type="button"
            onClick={() => login(formValue)}
          >
            Valider
          </button>
          <Link to="/inscription">
            <p className="mt-30">
              Pas encore de compte ?<br />
              Inscrivez vous !
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}
