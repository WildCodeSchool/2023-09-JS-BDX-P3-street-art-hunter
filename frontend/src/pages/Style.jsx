import Button from "../components/Button";
import ItemList from "../components/ItemList";

export default function Style() {
  return (
    <div className="container allow-scroll mt-30">
      <h1 className="mb-20">Titre 1</h1>
      <h2 className="mb-20">Titre 2</h2>
      <h3 className="mb-20">Titre 3</h3>
      <h4 className="mb-20">Titre 4</h4>
      <p className="mb-20">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam eius
        eaque officiis ipsam dolore inventore iste dolorum quia itaque fugit
        optio consectetur laudantium, sit ullam <a href="google.fr">Lien</a>
        eligendi est voluptates ipsa consequuntur?
      </p>
      <Button className="button mb-20">Valider</Button>
      <Button className="button red-button mb-20">Refuser</Button>
      <form className="mb-20">
        <label htmlFor="test" className="mb-10">
          Pseudo :{" "}
        </label>
        <div className="input">
          <input id="test" type="text" />
        </div>
      </form>
      <ItemList className="mb-20">
        <h5 className="mb-10">Rast</h5>
        <a href="google.fr" className="d-block mb-10">
          @artisterast
        </a>
        <Button className="button tiny-button">Galerie</Button>
      </ItemList>
      <ItemList className="mb-20">Item List with Image</ItemList>
      <div className="text-block">text-block</div>
    </div>
  );
}
