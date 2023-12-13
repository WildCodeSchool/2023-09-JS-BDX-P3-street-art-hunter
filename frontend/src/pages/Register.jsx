import Button from "../components/Button";

export default function Register() {
  return (
    <div>
      <h1 className="mb-20">Inscription</h1>
      <div className="container allow-scroll">
        <form className="mb-20">
          <label htmlFor="pseudo" className="mb-10 ">
            Pseudo
          </label>
          <input type="text" name="pseudo" id="pseudo" className="mb-10" />
          <label htmlFor="email" className="mb-10">
            Adresse email
          </label>
          <input type="text" name="email" id="email" className="mb-10" />
          <label htmlFor="postal" className="mb-10">
            Code Postal
          </label>
          <input type="text" name="postal" id="postal" className="mb-10" />
          <label htmlFor="city" className="mb-10">
            Ville
          </label>
          <input type="text" name="city" id="city" className="mb-10" />
          <label htmlFor="password" className="mb-10">
            Mot de passe
          </label>
          <input type="text" name="password" id="password" className="mb-10" />
          <label htmlFor="confirmation" className="mb-10">
            Confirmer le mot de passe
          </label>
          <input
            type="text"
            name="confirmation"
            id="confirmation"
            className="mb-10"
          />
        </form>
        <Button className="button mb-20">Valider</Button>
        <p className="mb-10">Déjà inscrit ?</p>
        <p className="mb-10">Connectez-vous !</p>
      </div>
    </div>
  );
}
