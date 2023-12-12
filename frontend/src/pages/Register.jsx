import Button from "../components/Button";

export default function Register() {
  return (
    <div>
      <h1>Inscription</h1>
      <div className="container allow-scroll">
        <form className="mb-20">
          <label htmlFor="pseudo" className="mt-30">
            Pseudo
          </label>
          <input type="text" name="pseudo" className="mt-10" />
          <label htmlFor="email" className="mt-10">
            Adresse email
          </label>
          <input type="text" name="email" className="mt-10" />
          <label htmlFor="postal" className="mt-10">
            Code Postal
          </label>
          <input type="text" name="postal" className="mt-10" />
          <label htmlFor="city" className="mt-10">
            Ville
          </label>
          <input type="text" name="city" className="mt-10" />
          <label htmlFor="password" className="mt-10">
            Mot de passe
          </label>
          <input type="text" name="password" className="mt-10" />
          <label htmlFor="confirmation" className="mt-10">
            Confirmer le mot de passe
          </label>
          <input type="text" name="confirmation" className="mt-10" />
        </form>
      </div>
      <Button className="button mb-20">Valider</Button>
      <p>Déjà inscrit ?</p>
      <p>Connectez-vous!</p>
    </div>
  );
}
