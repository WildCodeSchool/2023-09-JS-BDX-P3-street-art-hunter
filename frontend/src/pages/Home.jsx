/* eslint-disable no-alert */
import React, { useState, useRef } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import CustomMarker from "../components/Marker";
import CustomCircle from "../components/CustomCircle";
import Button from "../components/Button";
// import { pendingImage } from "../../../backend/src/controllers/pendingImageControllers";

export default function Home() {
  const [cameraPopup, setCameraPopup] = useState(false);
  const [captureForm, setCaptureForm] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [flashPopup, setFlashPopup] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const flashTimer = 150;
  const [zoomLevel, setZoomLevel] = useState(13); // Initaliser le zoom à 13
  const [map, setMap] = useState(null); // Initialiser la map à null
  const [pendingImageData, setPendingImageData] = useState(null);
  const userLocation = useLoaderData();
  const [pendingImageSrc, setPendingImageSrc] = useState("");

  const arts = [
    {
      id: 1,
      name: "Le pigeon",
      author: "A-mo",
      lat: 44.821308,
      long: -0.551763,
    },
    {
      id: 2,
      name: "Cosmic Visitor",
      author: "Inconnu",
      lat: 44.825882,
      long: -0.548732,
    },
    {
      id: 3,
      name: "Plaisir de faire",
      author: "Inconnu",
      lat: 44.833581,
      long: -0.565358,
    },
  ];

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 83px)",
  };

  const center = userLocation.lat
    ? userLocation
    : { lat: 44.837789, lng: -0.57918 };

  const mapOptions = {
    zoom: zoomLevel,
    mapTypeId: "roadmap",
    disableDefaultUI: true,
    styles: [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "administrative.locality",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#AFFFA0",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            color: "#EAFFE5",
          },
        ],
      },
      {
        featureType: "poi.business",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.government",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [
          {
            color: "#f9f8c7",
          },
        ],
      },
      {
        featureType: "poi.park",
        elementType: "labels",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [
          {
            color: "#59A499",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#F0FF8D",
          },
          {
            weight: 2.2,
          },
        ],
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit.station.airport",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#fdfabf",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            visibility: "on",
          },
          {
            color: "#1A87D6",
          },
        ],
      },
    ],
  };

  // Fonctions pour récupérer la date et l'heure pour l'envoie de la pendingImage
  const getDate = () => {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const getTime = () => {
    const currentTime = new Date();

    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };
  function getFormattedTime() {
    const currentTime = new Date();

    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}h${minutes}m${seconds}`;
    return formattedTime;
  }

  const createPendingImageSrc = () => {
    setPendingImageSrc(
      `upload-captured-image-${getDate()}_${getFormattedTime()}.jpg`
    );
  };

  // fonction pour fetch la pendingImage
  const fetchPendingImageData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3310/api/pendingImages/",
        {
          userId: 1,
          imgSrc: pendingImageSrc,
          uploadDate: getDate(),
          uploadTime: getTime(),
          latitude: userLocation.lat,
          longitude: userLocation.lat,
          streetArtId: 4,
          status: "pending",
        }
      );
      setPendingImageData(response.data);
      console.info(pendingImageData);
    } catch (error) {
      console.error("Erreur lors de la requête Axios:", error);
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo",
  });

  const handleZoomChange = () => {
    // Fonction qui change le zoom
    if (!map) return;
    setZoomLevel(map.getZoom());
  };

  if (loadError) return <div>Error loading maps</div>; // Si erreur de chargement, afficher un message d'erreur
  if (!isLoaded) return <div>Loading Maps...</div>; // Si chargement en cours, afficher un message de chargement

  // Gestion de l'ouverture et fermeture de la caméra de l'utilisateur
  const handleOpenCamera = () => {
    // ouvre la caméra en demandant les droits d'accès au navigateur
    if (!cameraPopup || !stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((newStream) => {
          setStream(newStream);

          if (videoRef.current) {
            // réinitialise le flux vidéo
            videoRef.current.srcObject = null;
            videoRef.current.srcObject = newStream;
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ouverture de l'appareil photo :",
            error
          );
        });
    }
  };
  const handleCloseCamera = () => {
    // coupe la camera
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }
  };

  // Gestion de la capture de photo en live
  const handleCaptureCamera = async () => {
    if (stream) {
      // récupère le contexte du canvas pour créer l'image
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // définit la taille du canvas pour correspondre à la taille de la photo
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // créé l'image de la vidéo sur le canvas
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // convertit le canvas en Blob au format JPG
      canvas.toBlob(
        (blob) => {
          // stocke le Blob dans le state capturedImage
          setCapturedImage(blob);
        },
        "image/jpeg",
        1
      );
    }
  };

  // Gestion du formulaire de validation une fois la photo prise

  const handleValidateCapture = async () => {
    if (capturedImage) {
      try {
        createPendingImageSrc();
        const formData = new FormData();
        formData.append("image", capturedImage, pendingImageSrc);

        const response = await fetch("http://localhost:3310/api/uploads/", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          handleCloseCamera();
          setCaptureForm(false);
          setCameraPopup(false);
          fetchPendingImageData();
          alert("Votre image a bien été envoyée");
        } else {
          console.error("Erreur lors de l'envoi de l'image au serveur");
        }
      } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
      }
    }
  };

  // Gestion du formulaire de prévisualisation et d'envoie pour validation
  const handleToggleForm = () => {
    // ouvre ou ferme le formulaire
    setCaptureForm(!captureForm);
  };
  const handleOpenForm = () => {
    // ouvre le formulaire
    setCaptureForm(true);
  };
  const handleCloseForm = () => {
    // ferme le formulaire
    setCaptureForm(false);
  };

  // Simule un flash d'appareil photo lors de la prise de capture
  const handleFlashPopup = () => {
    setFlashPopup(true);

    setTimeout(() => {
      setFlashPopup(false);
    }, flashTimer);
  };

  // Gestion de l'apparition de la popup camera
  const handleToggleCameraPopup = () => {
    setCameraPopup(!cameraPopup);
  };
  const openPopUp = () => {
    handleToggleCameraPopup();
    handleOpenCamera();
  };
  const closePopUp = () => {
    setCameraPopup(false);
    handleToggleCameraPopup();
    handleCloseCamera();
    handleCloseForm();
  };

  // Gestion la prise de photo
  const captureImage = () => {
    handleCaptureCamera();
    handleCloseCamera();
    handleFlashPopup();

    const flashAudio = document.getElementById("flashSound");
    if (flashAudio) {
      flashAudio.play();
    }

    setTimeout(() => {
      handleOpenForm();
    }, flashTimer);
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
        onLoad={(loadMap) => setMap(loadMap)}
        onZoomChanged={handleZoomChange}
      >
        {arts.map((art) => (
          <CustomMarker
            key={art.id}
            lat={art.lat}
            lng={art.long}
            initialZoomLevel
            text={
              <>
                <span>{art.name}</span>
                <br />
                <span>Auteur: {art.author}</span>
              </>
            }
          />
        ))}
        {userLocation.lat && (
          <CustomCircle
            lat={userLocation.lat}
            lng={userLocation.lng}
            zoom={zoomLevel}
          />
        )}
      </GoogleMap>
      <div style={{ height: "calc(100vh - 83px)" }}>
        <div className={`camera-popup${cameraPopup ? " active" : ""}`}>
          <div className="container container-small h-100 d-flex d-flex-center pos-r">
            <button
              className="camera-popup-close-button"
              onClick={closePopUp}
              type="button"
            >
              Fermer
            </button>
            {captureForm === false ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", height: "100%" }}
              >
                <track kind="captions" srcLang="en" label="English" />
              </video>
            ) : (
              <div className="capture-form">
                <img
                  src={URL.createObjectURL(new Blob([capturedImage]))}
                  alt="captured"
                  style={{ width: "100%" }}
                  className="capture-preview"
                />

                <div className="d-flex d-flex-space-around mt-30">
                  <Button
                    className="button"
                    type="button"
                    onClick={handleValidateCapture}
                  >
                    Envoyer
                  </Button>
                  <Button
                    color="red"
                    className="button"
                    type="button"
                    onClick={() => {
                      handleToggleForm();
                      handleOpenCamera();
                    }}
                  >
                    Restart
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className={`flash-popup${flashPopup ? " active" : ""}`} />
        </div>
        {!captureForm && (
          <div className="camera-button-container">
            {stream ? (
              <button
                className="camera-button"
                type="button"
                onClick={() => {
                  captureImage();
                }}
              >
                <img
                  className="w-100"
                  src="./src/assets/camera.png"
                  alt="Faire une capture"
                />
              </button>
            ) : (
              <button
                className="camera-button"
                type="button"
                onClick={openPopUp}
              >
                <img
                  className="w-100"
                  src="./src/assets/camera.png"
                  alt="Ouvre la capture"
                />
              </button>
            )}
          </div>
        )}
        <audio id="flashSound" src="/src/assets/audio/flash-retro.wav">
          <track kind="captions" />
        </audio>
      </div>
    </div>
  );
}
