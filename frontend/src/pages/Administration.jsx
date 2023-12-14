import React, { useState } from "react";

export default function Administration() {
  const buttons = [
    {
      id: 1,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Validations",
    },
    {
      id: 2,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Utilisateurs",
    },
    {
      id: 3,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Street-Arts",
    },
    {
      id: 4,
      image: "src/assets/block.png",
      activeImage: "src/assets/question-block.png",
      name: "Artistes",
    },
  ];

  const exemple = [
    {
      id: 1,
      image:
        "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
      lat: 3.5,
      long: 2.5,
    },
    {
      id: 2,
      image:
        "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
      lat: 3.5,
      long: 2.5,
    },
  ];

  const users = [
    {
      id: 1,
      pseudo: "Damien Jean",
      email: "damien@jean.fr",
      postals: "33000",
      city: "Bordeaux",
      password: "abcdefgh",
    },
    {
      id: 2,
      pseudo: "Kevin",
      email: "kevin@jean.fr",
      postals: "33000",
      city: "Bordeaux",
      password: "mmpoi",
    },
  ];

  const street = [
    {
      id: 1,
      image:
        "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
      name: "Le Pigeon",
      artist: "A-Mo",
    },
    {
      id: 2,
      image:
        "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
      name: "Le Pigeon",
      artist: "A-Mo",
    },
  ];

  const artists = [
    {
      id: 1,
      name: "A-Mo",
      hashtag: "@amoarts",
    },
    {
      id: 2,
      name: "A-Mo",
      hashtag: "@amoarts",
    },
  ];

  const [activeButton, setActiveButton] = useState(buttons[0].id);

  const handleOptionClick = (id) => {
    setActiveButton(id);
  };

  return (
    <>
      <h1>Administration</h1>
      <div className="container mt-40">
        <div className="admin-buttons mt-40 mb-30">
          {buttons.map((button) => (
            <button
              key={button.id}
              type="button"
              onClick={() => handleOptionClick(button.id)}
              className="block-button"
            >
              <div className="button-name">{button.name}</div>
              <img
                src={
                  activeButton === button.id ? button.activeImage : button.image
                }
                className={`block mt-10${
                  activeButton === button.id ? " active" : ""
                }`}
                alt={`Button ${button.id}`}
              />
            </button>
          ))}
        </div>

        <div className="allow-scroll">
          {activeButton ===
            buttons.find((button) => button.name === "Validations").id && (
            <div className="text-block">
              <div className="admin-item-list">
                {exemple.map((item) => (
                  <div key={item.id} className="admin-item has-two-items">
                    <div className="admin-item-contain">
                      <img src={item.image} alt={`Button ${item.id}`} />
                      <p>
                        X : 04,7689
                        <br />Y : 04,7689
                      </p>
                    </div>
                    <div className="admin-item-contain">
                      <img src={item.image} alt={`Button ${item.id}`} />
                      <p>
                        X : 04,7689
                        <br />Y : 04,7689
                      </p>
                    </div>
                    <div className="admin-button-container">
                      <button className="button" type="button">
                        Valider
                      </button>
                      <button className="button red-button mt-20" type="button">
                        Refuser
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeButton ===
            buttons.find((button) => button.name === "Utilisateurs").id && (
            <div className="text-block">
              <div className="admin-item-list">
                {users.map((user) => (
                  <div key={user.id} className="admin-item">
                    <p>{user.pseudo}</p>
                    <p>{user.email}</p>
                    <p>{user.postals}</p>
                    <p>{user.city}</p>
                    <p>{user.password}</p>
                    <div className="admin-button-container">
                      <button className="button" type="button">
                        Modifier
                      </button>
                      <button className="button red-button mt-20" type="button">
                        Exclure
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeButton ===
            buttons.find((button) => button.name === "Street-Arts").id && (
            <div className="text-block">
              <div className="admin-item-list">
                {street.map((art) => (
                  <div key={art.id} className="admin-item">
                    <img src={art.image} alt={`Button ${art.id}`} />
                    <p>{art.name}</p>
                    <p>Par {art.artist}</p>
                    <div className="admin-button-container">
                      <button className="button" type="button">
                        Modifier
                      </button>
                      <button className="button red-button mt-20" type="button">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeButton ===
            buttons.find((button) => button.name === "Artistes").id && (
            <div className="text-block">
              <div className="admin-item-list">
                {artists.map((artist) => (
                  <div key={artist.id} className="admin-item">
                    <p>{artist.name}</p>
                    <p>{artist.hashtag}</p>
                    <div className="admin-button-container">
                      <button className="button" type="button">
                        Modifier
                      </button>
                      <button className="button red-button mt-20" type="button">
                        Supprimer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
