import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import { useAdminContext } from "../context/AdminContext";

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

  // const street = [
  //   {
  //     id: 1,
  //     image:
  //       "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
  //     name: "Le Pigeon",
  //     artist: "A-Mo",
  //   },
  //   {
  //     id: 2,
  //     image:
  //       "https://www.street-artwork.com/uploads/document/63f74a685c6b9775130667.JPG",
  //     name: "Le Pigeon",
  //     artist: "A-Mo",
  //   },
  // ];

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(buttons[0].id);

  const {
    users,
    removeUser,
    artists,
    removeArtist,
    validations,
    streetArt,
    removeStreetArt,
    setSelectedStreetArt,
  } = useAdminContext();

  const formattedDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };
  const [images, setImages] = useState(validations);

  const handleOptionClick = (id) => {
    setActiveButton(id);
  };

  const changePendingImage = async (id, status) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:3310/api/pendingImages/status/${id}`,
        { status }
      );
      const filteredData = [...images.filter((item) => item.id !== data.id)];
      setImages(filteredData);
    } catch (error) {
      console.error("Error validating image:", error);
    }
  };

  const handleModifyClick = useCallback(
    async (art) => {
      navigate(`/administration/modifier/${art.id}`);
    },
    [setSelectedStreetArt]
  );

  useEffect(() => {
    setImages(validations);
  }, [validations]);

  return (
    <div className="admin-page allow-scroll-container">
      <div>
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
                    activeButton === button.id
                      ? button.activeImage
                      : button.image
                  }
                  className={`block mt-10${
                    activeButton === button.id ? " active" : ""
                  }`}
                  alt={`Button ${button.id}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Validations */}

      <div className="allow-scroll pos-r">
        <div className="admin-validations bg-text-block">
          {activeButton ===
            buttons.find((button) => button.name === "Validations").id && (
            <div className="admin-item-list">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="admin-item
                  "
                >
                  <h5 className="t-center mb-20">
                    #{item.id} - Le {formattedDate(item.upload_date)} à{" "}
                    {item.upload_time}
                  </h5>
                  <div className="has-two-items">
                    <div className="admin-item-child">
                      <h4 className="mb-20">{item.street_art_name}</h4>
                      <img
                        src={item.street_art_image}
                        alt={item.street_art_image}
                      />
                      <p>
                        X : {item.street_art_longitude}
                        <br />Y : {item.street_art_latitude}
                      </p>
                    </div>
                    <div className="admin-item-child">
                      <h4 className="mb-20">{item.username}</h4>
                      <img
                        src={`http://localhost:3310/uploads/${item.img_src}`}
                        alt={`${item.username}'s upload`}
                      />
                      <p>
                        X : {item.longitude}
                        <br />Y : {item.latitude}
                      </p>
                    </div>
                  </div>
                  <div className="admin-button-container mt-20">
                    <Button
                      className="button"
                      type="button"
                      onClick={() => changePendingImage(item.id, "validate")}
                    >
                      Valider
                    </Button>
                    <Button
                      color="red"
                      className="button"
                      type="button"
                      onClick={() => changePendingImage(item.id, "refused")}
                    >
                      Refuser
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Utilisateurs */}

          {activeButton ===
            buttons.find((button) => button.name === "Utilisateurs").id && (
            <div className="admin-users">
              <div className="admin-item-list">
                {users
                  .filter((user) => !user.is_admin)
                  .map((user) => (
                    <div key={user.id} className="admin-item">
                      <div className="admin-user admin-item-infos">
                        <p>Pseudo : {user.username}</p>
                        <p>Email : {user.email}</p>
                        <p>Code Postal : {user.postcode}</p>
                        <p>Ville : {user.city}</p>
                      </div>
                      <div className="admin-button-container">
                        <Button color="yellow" className="button" type="button">
                          Modifier
                        </Button>
                        <Button
                          color="red"
                          className="button"
                          type="button"
                          onClick={() => removeUser(user.id)}
                        >
                          Exclure
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Street arts */}

          {activeButton ===
            buttons.find((button) => button.name === "Street-Arts").id && (
            <div className="admin-streetarts">
              <div className="admin-item-list">
                {streetArt.map((art) => (
                  <div key={art.id} className="admin-item">
                    <div className="admin-item-infos">
                      <img src={art.image} alt={`Button ${art.id}`} />
                      <p>
                        {art.title}
                        <br />
                        Par {art.author}
                      </p>
                    </div>
                    <div className="admin-button-container">
                      <Button
                        color="yellow"
                        className="button"
                        type="button"
                        onClick={() => handleModifyClick(art)}
                      >
                        Modifier
                      </Button>
                      <Button
                        color="red"
                        className="button"
                        type="button"
                        onClick={() => removeStreetArt(art.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Artistes */}

          {activeButton ===
            buttons.find((button) => button.name === "Artistes").id && (
            <div className="admin-artists">
              <div className="admin-item-list">
                {artists.map((artist) => (
                  <div key={artist.id} className="admin-item">
                    <div className="admin-item-infos">
                      <p>
                        Artiste {artist.id} : {artist.name}
                      </p>
                      <p>Biographie : {artist.biography}</p>
                      <p>
                        Site web :{" "}
                        <span className="tiny-text">{artist.website}</span>
                      </p>
                    </div>
                    <div className="admin-button-container">
                      <Button color="yellow" className="button" type="button">
                        Modifier
                      </Button>
                      <Button
                        color="red"
                        className="button"
                        type="button"
                        onClick={removeArtist}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
