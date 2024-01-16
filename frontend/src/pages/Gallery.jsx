import React from "react";
import ModalImage from "react-modal-image";
import Button from "../components/Button";
import ItemList from "../components/ItemList";
import Slider from "../components/Slider";

import "../style/main.css";
import { useAdminContext } from "../context/AdminContext";

export default function Gallery() {
  const { streetArt, artists } = useAdminContext();

  return (
    <div className="allow-scroll-container">
      <h1>Galerie</h1>
      <Slider
        leftValue="Arts"
        rightValue="Artistes"
        linkOne="/galerie/arts"
        linkTwo="/galerie/artistes"
      >
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll">
              <div className="container list-container">
                {streetArt.map((art) => (
                  <ItemList key={art.id} className="has-img mb-20">
                    <ModalImage
                      small={art.image}
                      large={art.image}
                      alt={art.title}
                    />
                    <div className="item-infos">
                      <h5>{art.title}</h5>
                      <p>
                        Par <a href="google.fr">{art.author}</a>
                      </p>
                      <Button className="button tiny-button">
                        S'Y RENDRE!
                      </Button>
                    </div>
                  </ItemList>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll">
              <div className="container list-container">
                {artists.map((artist) => (
                  <ItemList key={artist.id} className="mb-20">
                    <h5 className="mb-20">{artist.name}</h5>
                    <a href={artist.website} className="d-block mb-20">
                      Site Web
                    </a>
                    <Button className="button tiny-button">Galerie</Button>
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
