import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useAdminContext } from "../context/AdminContext";
import Button from "./Button";

function ChangeStreetArt() {
  const loaderData = useLoaderData();

  const { updateStreetArt } = useAdminContext();

  const [changeArt, setChangeArt] = useState(loaderData?.streetArt);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!changeArt?.id) {
      return;
    }

    try {
      await updateStreetArt(changeArt.id, changeArt);
      // redirect ou mettre a jour le state
    } catch (error) {
      console.warn(error.message);
    }
    // (changeArt.id, changeArt);
  };

  return (
    <div className="container-extra-small">
      <form onSubmit={handleSubmit}>
        <label htmlFor="image">Image</label>
        <input
          type="text"
          name="image"
          id="image"
          value={changeArt.image}
          onChange={(e) =>
            setChangeArt({ ...changeArt, image: e.target.value })
          }
        />
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          name="title"
          id="title"
          value={changeArt.title || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, title: e.target.value })
          }
        />
        <label htmlFor="author">Auteur :</label>
        <input
          type="text"
          name="author"
          id="author"
          value={changeArt.author || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, author: e.target.value })
          }
        />
        <label htmlFor="address">Adresse : </label>
        <input
          type="text"
          name="address"
          id="address"
          value={changeArt.address || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, address: e.target.value })
          }
        />
        {/* <label htmlFor="creation_date">Creation_date : </label>
        <input
          type="text"
          name="creation_date"
          id="creation_date"
          value={changeArt.creation_date || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, creation_date: e.target.value })
          }
        /> */}
        <label htmlFor="longitude">longitude: </label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          value={changeArt.longitude || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, longitude: e.target.value })
          }
        />
        <label htmlFor="latitude">latitude: </label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          value={changeArt.latitude || ""}
          onChange={(e) =>
            setChangeArt({ ...changeArt, latitude: e.target.value })
          }
        />
        <Button type="submit" className="button mb-20">
          Modifier
        </Button>
      </form>
    </div>
  );
}

export default ChangeStreetArt;
