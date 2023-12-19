import React from "react";
import Button from "../components/Button";
import ItemList from "../components/ItemList";
import Slider from "../components/Slider";
import "../style/main.css";

export default function Gallery() {
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
    <>
      <h1>Galerie</h1>
      <Slider
        className="galery mt-20 mb-20"
        leftValue="Arts"
        rightValue="Artistes"
        linkOne="/galerie/arts"
        linkTwo="/galerie/artistes"
      >
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll tiny-allow-scroll">
              <div className="container list-container">
                {items.map((item) => (
                  <ItemList key={item.id} className="has-img mb-20">
                    <img src={item.img_url} alt={item.name} />
                    <div className="item-infos">
                      <h5>{item.name}</h5>
                      <p>
                        Par <a href="google.fr">{item.artist}</a>
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
            <div className="allow-scroll tiny-allow-scroll">
              <div className="container list-container">
                {/* {[1, 2, 3, 4, 5, 6].map((index) => (
                  <ItemList key={index} className="mb-20">
                    <h5 className="mb-10">Rast</h5>
                    <a href="google.fr" className="d-block mb-10">
                      @artisterast
                    </a>
                    <Button className="button tiny-button">Galerie</Button>
                  </ItemList>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </>
  );
}
