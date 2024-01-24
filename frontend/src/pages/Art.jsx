import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { useParams } from "react-router-dom";
import ItemList from "../components/ItemList";
import Button from "../components/Button";

function Art() {
  const { artistId } = useParams();
  const [arts, setArts] = useState([]);
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/artists/${artistId}`
        );
        const data = await response.json();
        if (data.length === 0) {
          return;
        }
        setArtistName(data.name);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchStreetArts = async () => {
      try {
        const response = await fetch(
          `http://localhost:3310/api/streetart/artists/${artistId}`
        );
        const data = await response.json();
        if (data.length === 0) {
          return;
        }
        setArts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStreetArts();
    fetchArtistData();
  }, [artistId]);

  return (
    <div className="allow-scroll-container">
      <h1>Galerie - {artistName}</h1>
      <div className="allow-scroll">
        <div className="container list-container">
          {arts.map((art) => (
            <ItemList key={art.id} className="has-img mb-20">
              <ModalImage small={art.image} large={art.image} alt={art.title} />
              <div className="item-infos">
                <h5>{art.title}</h5>
                <Button className="button tiny-button">S'Y RENDRE!</Button>
              </div>
            </ItemList>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Art;
