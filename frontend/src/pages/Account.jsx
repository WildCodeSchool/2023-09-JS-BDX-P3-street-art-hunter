import Button from "../components/Button";
import ItemList from "../components/ItemList";
import Slider from "../components/Slider";

export default function Account() {
  const users = [
    {
      id: 1,
      pseudo: "Damien Jean",
      mail: "damien@jean.fr",
      postalCode: "33000",
      city: "Bordeaux",
      password: "abdc123",
      points: "1000",
    },
    {
      id: 2,
      pseudo: "Dimitri Diego",
      mail: "dimitri@diego.fr",
      postalCode: "33100",
      city: "Talence",
      password: "jaimelerhum",
      points: "1000",
    },
  ];

  const items = [
    {
      id: 1,
      img_url:
        "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
      name: "Le pigeon",
      artist: "A-Mo",
    },
    {
      id: 2,
      img_url:
        "https://www.street-artwork.com/uploads/document/5c7d3ce59cdbb387150263.jpg",
      name: "Inconnu",
      artist: "Inconnu",
    },
    {
      id: 3,
      img_url:
        "https://www.street-artwork.com/uploads/document/5ba7cef2f23c3139271885.jpg",
      name: "Inconnu",
      artist: "Inconnu",
    },
    {
      id: 4,
      img_url:
        "https://www.street-artwork.com/uploads/document/6427faa8f220f202972888.jpeg",
      name: "Monsieur Poulet",
      artist: "Inconnu",
    },
  ];

  const displayedUser = users[0];

  return (
    <>
      <h1>Mon compte</h1>
      <h3 className="score t-center">
        <img src="/src/assets/coin.gif" alt="coin" /> x{displayedUser.points}
      </h3>
      <Slider
        className="account mt-20 mb-20"
        leftValue="Infos"
        rightValue="Arts"
        linkOne="/mon-compte/informations"
        linkTwo="/mon-compte/arts"
      >
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll tiny-allow-scroll">
              <div className="container">
                <p className="mb-20 mt-40">Pseudo : {displayedUser.pseudo}</p>
                <p className="mb-20">Mail : {displayedUser.mail}</p>
                <p className="mb-20">
                  Code Postal : {displayedUser.postalCode}
                </p>
                <p className="mb-20">Ville : {displayedUser.city}</p>
                <p className="mb-20">Mot de passe : {displayedUser.password}</p>
                <Button color="red" className="button mi-auto mt-40">
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll minus-allow-scroll">
              <div className="container list-container">
                {items.map((item) => (
                  <ItemList key={item.id} className="has-img mb-20">
                    <img src={item.img_url} alt={item.name} />
                    <div className="item-infos">
                      <h5>{item.name}</h5>
                      <p>
                        Par <a href="google.fr">{item.artist}</a>
                      </p>
                      <p>Le 13/12/2023</p>
                    </div>
                  </ItemList>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}
