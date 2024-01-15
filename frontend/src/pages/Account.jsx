import { useEffect, useState } from "react";
import Button from "../components/Button";
import ItemList from "../components/ItemList";
import Slider from "../components/Slider";
import { useLogin } from "../context/LoginContext";
import { useAdminContext } from "../context/AdminContext";

export default function Account() {
  const { logout } = useLogin();
  const { removeUser } = useAdminContext();
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(`http://localhost:3310/api/users/me`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.ok) {
            const user = await response.json();
            setLoggedUser(user);
          } else {
            console.error("Failed to fetch user data");
          }
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async () => {
    removeUser(loggedUser.id);
    logout();
  };

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

  return (
    <div className="allow-scroll-container">
      <div>
        <h1>Mon compte</h1>
        <h3 className="score t-center">
          <img src="/src/assets/coin.gif" alt="coin" /> x{loggedUser.points}
        </h3>
      </div>
      <Slider
        leftValue="Infos"
        rightValue="Arts"
        linkOne="/mon-compte/informations"
        linkTwo="/mon-compte/arts"
      >
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll">
              <div className="container">
                <p className="mb-20">Pseudo : {loggedUser.username}</p>
                <p className="mb-20">Mail : {loggedUser.email}</p>
                <p className="mb-20">Code Postal : {loggedUser.postcode}</p>
                <p className="mb-20">Ville : {loggedUser.city}</p>
                <Button color="yellow" className="button mt-40">
                  Modifier
                </Button>
                <Button color="red" className="button mt-40" onClick={logout}>
                  Se déconnecter
                </Button>
                <Button
                  color="red"
                  className="button mt-40"
                  onClick={handleDelete}
                >
                  Supprimer mon compte
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll">
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
    </div>
  );
}
