import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { useAdminContext } from "../context/AdminContext";

export default function UpdateArtist() {
  const [artists, setArtists] = useState({});
  const { artistId } = useParams();
  const navigate = useNavigate();

  const { updateArtist } = useAdminContext();

  useEffect(() => {
    const fetchArtistData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch(
            `http://localhost:3310/api/artists/${artistId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.ok) {
            const artist = await response.json();
            setArtists(artist);
          } else {
            console.error("Failed to fetch artist data");
          }
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchArtistData();
  }, [artistId]);

  const [formData, setFormData] = useState({
    name: "",
    biography: "",
    website: "",
  });

  const updateArtistForm = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "name":
        return !value ? ["Le nom est requis"] : [];
      case "biography":
        return !value ? ["La biographie est requise"] : [];
      case "website":
        return !value ? ["Le site web est requis"] : [];
      default:
        return [];
    }
  };

  const [alertMessage, setAlertMessage] = useState({
    name: [],
    biography: [],
    website: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAlerts = {};
    let isValid = true;

    for (const fieldName of Object.keys(formData)) {
      const fieldErrors = validateField(fieldName, formData[fieldName]);
      updatedAlerts[fieldName] = fieldErrors;
      if (fieldErrors.length > 0) isValid = false;
    }

    setAlertMessage(updatedAlerts);

    if (isValid) {
      updateArtist(artists.id, formData);
    }
    navigate("/administration");
  };

  return (
    <div className="container allow-scroll-container ">
      <h1 className="mb-20">Modifier le compte</h1>
      <div className="allow-scroll">
        <div>
          <form className="mb-20">
            <label htmlFor="name" className="mb-10 ">
              Nom
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={(e) => updateArtistForm("name", e.target.value)}
              />
            </div>
            {alertMessage.name.length > 0 && (
              <div className="error-message ml-1 mb-10 tiny-text ml-1">
                {alertMessage.username}
              </div>
            )}

            <label htmlFor="biography" className="mb-10">
              Biographie
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="biography"
                id="biography"
                required
                value={formData.biography}
                onChange={(e) => updateArtistForm("biography", e.target.value)}
              />
            </div>
            {alertMessage.biography.length > 0 && (
              <div className="error-message mb-10 tiny-text">
                {alertMessage.email}
              </div>
            )}
            <label htmlFor="website" className="mb-10">
              Site web
            </label>
            <div className="input mb-10">
              <input
                type="text"
                name="website"
                id="website"
                value={formData.website}
                onChange={(e) => updateArtistForm("website", e.target.value)}
              />
            </div>
          </form>
          <Button type="submit" className="button mb-20" onClick={handleSubmit}>
            Valider
          </Button>
        </div>
      </div>
    </div>
  );
}
