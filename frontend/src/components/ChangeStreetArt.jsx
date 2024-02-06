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
    <div>
      <form onSubmit={handleSubmit} className="admin-item-infos ">
        <label className="mb-10" htmlFor="image">
          Image
        </label>
        <div className="input mb-20">
          <input
            type="text"
            name="image"
            id="image"
            value={changeArt.image}
            onChange={(e) =>
              setChangeArt({ ...changeArt, image: e.target.value })
            }
          />
        </div>
        <label className="mb-10" htmlFor="title">
          Titre
        </label>
        <div className="input mb-20">
          <input
            type="text"
            name="title"
            id="title"
            value={changeArt.title || ""}
            onChange={(e) =>
              setChangeArt({ ...changeArt, title: e.target.value })
            }
          />
        </div>
        <label className="mb-10" htmlFor="author">
          Auteur :
        </label>
        <div className="input mb-20">
          <input
            type="text"
            name="author"
            id="author"
            value={changeArt.author || ""}
            onChange={(e) =>
              setChangeArt({ ...changeArt, author: e.target.value })
            }
          />
        </div>
        <label className="mb-10" htmlFor="address">
          Adresse :
        </label>
        <div className="input">
          <input
            type="text"
            name="address"
            id="address"
            value={changeArt.address || ""}
            onChange={(e) =>
              setChangeArt({ ...changeArt, address: e.target.value })
            }
          />
        </div>
        <label className="mb-10" htmlFor="longitude">
          Longitude:
        </label>
        <div className="input mb-20">
          <input
            type="text"
            name="longitude"
            id="longitude"
            value={changeArt.longitude || ""}
            onChange={(e) =>
              setChangeArt({ ...changeArt, longitude: e.target.value })
            }
          />
        </div>
        <label className="mb-10" htmlFor="latitude">
          Latitude:
        </label>
        <div className="input mb-30">
          <input
            type="text"
            name="latitude"
            id="latitude"
            value={changeArt.latitude || ""}
            onChange={(e) =>
              setChangeArt({ ...changeArt, latitude: e.target.value })
            }
          />
        </div>
        <Button type="submit" className=" button mt-20">
          Modifier
        </Button>
      </form>
    </div>
  );
}

export default ChangeStreetArt;
