import Button from "../components/Button";

export default function Register() {
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
              <input type="text" name="pseudo" id="pseudo" />
            </div>
            <label htmlFor="email" className="mb-10">
              Adresse email
            </label>
            <div className="input mb-10">
              <input type="text" name="email" id="email" />
            </div>
            <label htmlFor="postal" className="mb-10">
              Code Postal
            </label>
            <div className="input mb-10">
              <input type="text" name="postal" id="postal" />
            </div>
            <label htmlFor="city" className="mb-10">
              Ville
            </label>
            <div className="input mb-10">
              <input type="text" name="city" id="city" />
            </div>

            <label htmlFor="password" className="mb-10">
              Mot de passe
            </label>
            <div className="input mb-10">
              <input type="text" name="password" id="password" />
            </div>
            <label htmlFor="confirmation" className="mb-10">
              Confirmer le mot de passe
            </label>
            <div className="input mb-10">
              <input type="text" name="confirmation" id="confirmation" />
            </div>
          </form>
          <Button className="button mb-20">Valider</Button>
          <p className="mb-10">Déjà inscrit ?</p>
          <p className="mb-20">Connectez-vous !</p>
        </div>
      </div>
    </div>
  );
}
