import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";

function UpdateStreetArt() {
  const { selectedStreetArt, fetchOneStreetArt } = useAdminContext();
  const [updateStreetArt, setUpdateStreetArt] = useState({
    title: "",
    image: "",
    latitude: "",
    longitude: "",
    address: "",
    creation_date: "",
    author: "",
  });

  const idP = useParams();

  const handleClick = (field, value) => {
    setUpdateStreetArt({ ...updateStreetArt, [field]: value });
  };

  // handleSubmit > rappeler handleClick

  useEffect(() => {
    fetchOneStreetArt(idP.id);
  }, []);

  return (
    <div className="admin-streetarts">
      <div className="admin-item-list">
        <div key={selectedStreetArt?.id} className="admin-item">
          <div className="admin-item-infos">
            <img
              src={selectedStreetArt?.image}
              alt={`Button ${selectedStreetArt?.id}`}
            />
            <p>
              {selectedStreetArt?.title}
              <br />
              Par {selectedStreetArt?.author}
            </p>
            <p className="mb-10">Artiste: {selectedStreetArt.author}</p>
            <p className="mb-10">Adresse: {selectedStreetArt.address}</p>{" "}
            <p className="mb-10">Créé le: {selectedStreetArt.creation_date}</p>
            <p className="mb-10">Lng: {selectedStreetArt.longitude}</p>
            <p className="mb-10">Lat: {selectedStreetArt.latitude}</p>
          </div>
        </div>
      </div>
      <div>
        <form action="PUT">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            name="title"
            id="title"
            value={UpdateStreetArt.title}
            onChange={(e) => handleClick("title", e.target.value)}
          />
          <label htmlFor="image">Image</label>
          {/* <input type="text" name="image" id="image" value="" onChange={}/>
          <label htmlFor="latitude">latitude</label>
          <input type="text" name="latitude" id="latitude" value="" onChange={} />
          <label htmlFor="longitude">longitude :</label>
          <input type="text" name="longitude" id="longitude" value="" onChange={}/>
          <label htmlFor="address">Adresse :</label>
          <input type="text" name="address" id="address" value="address" onChange={} />
          <label htmlFor="creation_date">creation_date :</label>
          <input type="text" name="creation_date" id="creation_date" value="" onChange={} />
          <label htmlFor="author">author :</label>
          <input type="text" name="author" id="author" value="" onChange={} /> */}
        </form>
      </div>
    </div>
  );
}

export default UpdateStreetArt;
