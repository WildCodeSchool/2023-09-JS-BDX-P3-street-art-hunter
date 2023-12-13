import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <h1>Connexion</h1>
      <div className="container allow-scroll mt-60">
        <form className="mb-20">
          <label htmlFor="test" className="mb-10">
            Pseudo :{" "}
          </label>
          <div className="input mb-30">
            <input id="test" type="text" />
          </div>
          <label htmlFor="test" className="mb-10">
            Mot de passe :{" "}
          </label>
          <div className="input">
            <input id="test" type="text" />
          </div>
        </form>
        <button className="button mb-10 mt-40" type="button">
          Valider
        </button>
        <Link to="/inscription">
          <p className="mt-30">
            Pas encore de compte ?<br />
            Inscrivez vous !
          </p>
        </Link>
      </div>
    </>
  );
}
