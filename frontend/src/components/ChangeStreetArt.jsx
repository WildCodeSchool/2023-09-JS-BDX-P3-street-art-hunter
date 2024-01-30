import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import Button from "./Button";

function ChangeStreetArt() {
  const loaderData = useLoaderData();
  const navigate = useNavigate();

  const { updateStreetArt } = useAdminContext();

  const [changeArt, setChangeArt] = useState(loaderData?.streetArt);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!changeArt?.id) {
      return;
    }
    try {
      await updateStreetArt(changeArt.id, changeArt);
      navigate(`/administration`);
    } catch (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="container-extra-small allow-scroll-container">
      <form onSubmit={handleSubmit} className="admin-item-infos ">
        <label className="mb-10" htmlFor="image">
          Image
        </label>
        <input
          type="text"
          name="image"
          id="image"
          className="mb-10"
          value={changeArt.image}
          onChange={(e) =>
            setChangeArt({ ...changeArt, image: e.target.value })
          }
        />
        <label className="mb-10" htmlFor="title">
          Titre
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="mb-10"
          value={changeArt.title || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, title: e.target.value })
          }
        />
        <label className="mb-10" htmlFor="author">
          Auteur :
        </label>
        <input
          type="text"
          name="author"
          id="author"
          className="mb-10"
          value={changeArt.author || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, author: e.target.value })
          }
        />
        <label className="mb-10" htmlFor="address">
          Adresse :{" "}
        </label>
        <input
          type="text"
          name="address"
          id="address"
          className="mb-10"
          value={changeArt.address || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, address: e.target.value })
          }
        />

        <label className="mb-10" htmlFor="longitude">
          Longitude:{" "}
        </label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          className="mb-10"
          value={changeArt.longitude || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, longitude: e.target.value })
          }
        />
        <label className="mb-10" htmlFor="latitude">
          Latitude:{" "}
        </label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          className="mb-10"
          value={changeArt.latitude || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, latitude: e.target.value })
          }
        />
        <Button type="submit" className=" button mb-20">
          Modifier
        </Button>
      </form>
    </div>
  );
}

export default ChangeStreetArt;
