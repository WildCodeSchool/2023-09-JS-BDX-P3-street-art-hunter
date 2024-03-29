import React, { useCallback, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import Button from "../components/Button";
import { useAdminContext } from "../context/AdminContext";
import { useLogin } from "../context/LoginContext";
import questionBlock from "../assets/question-block.png";
import block from "../assets/block.png";
import InfiniteScrollComponent from "../components/InfiniteScrollComponent";

export default function Administration() {
  const buttons = [
    {
      id: 1,
      image: block,
      activeImage: questionBlock,
      name: "Validations",
    },
    {
      id: 2,
      image: block,
      activeImage: questionBlock,
      name: "Utilisateurs",
    },
    {
      id: 3,
      image: block,
      activeImage: questionBlock,
      name: "Street-Arts",
    },
    {
      id: 4,
      image: block,
      activeImage: questionBlock,
      name: "Artistes",
    },
  ];

  const { validations } = useLoaderData();
  const [collection, setCollection] = useState(validations);

  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(buttons[0].id);

  const { removeUser, removeArtist, removeStreetArt, setSelectedStreetArt } =
    useAdminContext();

  const { apiService } = useLogin();

  const formattedDate = (date) => {
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const day = dateObject.getDate().toString().padStart(2, "0");
    return `${day}/${month}/${year}`;
  };

  const handleOptionClick = (id) => {
    setActiveButton(id);
  };

  const changePendingImage = async (id, status, userId) => {
    try {
      await apiService.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/pendingImages/status/${id}`,
        { status, userId }
      );
      setCollection([...collection.filter((item) => item.id !== id)]);
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

  function toRadians(degrees) {
    return degrees * (Math.PI / 180);
  }
  function getDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Rayon moyen de la Terre en kilomètres
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distanceInKm = R * c; // Distance en kilomètres
    const distanceInM = distanceInKm * 1000; // Convertir en mètres
    return distanceInM.toFixed(2);
  }

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

      <div className="container of-hidden">
        {/* Validations */}
        {activeButton ===
          buttons.find((button) => button.name === "Validations").id && (
          <div className="allow-scroll pos-r">
            <div className="admin-validations bg-text-block">
              {collection.length > 0 ? (
                <div className="admin-item-list">
                  {collection.map((item) => (
                    <div key={item.id} className="admin-item">
                      <h5 className="t-center">
                        #{item.id} - Le {formattedDate(item.upload_date)} à{" "}
                        {item.upload_time}
                      </h5>
                      <div className="has-two-items">
                        <div className="admin-item-child">
                          <h4 className="mb-20">Modèle</h4>
                          <img
                            src={item.street_art_image}
                            alt={item.street_art_image}
                          />
                        </div>
                        <div className="admin-item-child">
                          <h4 className="mb-20">{item.username}</h4>
                          <img
                            src={`${import.meta.env.VITE_BACKEND_URL}/${
                              item.img_src
                            }`}
                            alt={`${item.username}'s upload`}
                          />
                        </div>
                      </div>
                      <h4 className="t-center mb-20 mt-20 d-block">
                        Distance ={" "}
                        {getDistance(
                          item.street_art_longitude,
                          item.street_art_latitude,
                          item.longitude,
                          item.latitude
                        )}
                        m
                      </h4>
                      <div className="admin-button-container mt-20">
                        <Button
                          className="button"
                          type="button"
                          onClick={async () => {
                            await changePendingImage(
                              item.id,
                              "validate",
                              item.user_id
                            );
                          }}
                        >
                          Valider
                        </Button>
                        <Button
                          color="red"
                          className="button"
                          type="button"
                          onClick={() =>
                            changePendingImage(item.id, "refused", item.user_id)
                          }
                        >
                          Refuser
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h4 className="t-center mb-20 mt-20">
                  Aucune validation en attente.
                </h4>
              )}
            </div>
          </div>
        )}

        {/* Utilisateurs */}
        {activeButton ===
          buttons.find((button) => button.name === "Utilisateurs").id && (
          <InfiniteScrollComponent
            scrollClass="allow-scroll pos-r"
            boxClass="admin-users bg-text-block"
            listClass="admin-item-list"
            apiEndpoint={`${import.meta.env.VITE_BACKEND_URL}/api/users/data`}
          >
            {(user) => (
              <div key={user.id} className="admin-item">
                <div className="admin-user admin-item-infos">
                  <p>Pseudo : {user.username}</p>
                  <p>Email : {user.email}</p>
                  <p>Code Postal : {user.postcode}</p>
                  <p>Ville : {user.city}</p>
                </div>
                <div className="admin-button-container">
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
            )}
          </InfiniteScrollComponent>
        )}

        {/* Street arts */}
        {activeButton ===
          buttons.find((button) => button.name === "Street-Arts").id && (
          <InfiniteScrollComponent
            scrollClass="allow-scroll pos-r"
            boxClass="admin-streetarts bg-text-block"
            listClass="admin-item-list"
            apiEndpoint={`${
              import.meta.env.VITE_BACKEND_URL
            }/api/streetart/data`}
          >
            {(art) => (
              <div key={art.id} className="admin-item">
                <div className="admin-item-infos d-flex d-flex-center d-flex-column">
                  <img
                    className="mb-20"
                    src={art.image}
                    alt={`Button ${art.id}`}
                  />
                  <div>
                    <p className="mb-10">
                      #{art.id} - {art.title}
                    </p>
                    <p className="mb-10">Artiste: {art.author}</p>
                    <p className="mb-10">Adresse: {art.address}</p>
                    <p className="mb-10">Créé le: {art.formattedDate}</p>
                    <p className="mb-10">Lng: {art.longitude}</p>
                    <p className="mb-10">Lat: {art.latitude}</p>
                  </div>
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
            )}
          </InfiniteScrollComponent>
        )}

        {/* Artistes */}
        {activeButton ===
          buttons.find((button) => button.name === "Artistes").id && (
          <InfiniteScrollComponent
            scrollClass="allow-scroll pos-r"
            boxClass="admin-streetarts bg-text-block"
            listClass="admin-item-list"
            apiEndpoint={`${import.meta.env.VITE_BACKEND_URL}/api/artists/data`}
          >
            {(artist) => (
              <div key={artist.id} className="admin-item">
                <div className="admin-item-infos">
                  <p className="mb-10">
                    Artiste {artist.id} : {artist.name}
                  </p>
                  <p className="mb-10">Biographie : {artist.biography}</p>
                  <p className="mb-10">
                    <a target="_blank" rel="noreferrer" href={artist.website}>
                      Site web
                    </a>
                  </p>
                </div>
                <div className="admin-button-container">
                  <Button
                    color="yellow"
                    className="button"
                    type="button"
                    onClick={() =>
                      navigate(`/administration/modifier-artistes/${artist.id}`)
                    }
                  >
                    Modifier
                  </Button>
                  <Button
                    color="red"
                    className="button"
                    type="button"
                    onClick={() => removeArtist(artist.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              </div>
            )}
          </InfiniteScrollComponent>
        )}
      </div>
    </div>
  );
}
