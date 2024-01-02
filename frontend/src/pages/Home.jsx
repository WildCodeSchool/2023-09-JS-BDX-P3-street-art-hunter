import React, { useState, useRef } from "react";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import CustomMarker from "../components/Marker";
import Button from "../components/Button";

export default function Home() {
  const [cameraPopup, setCameraPopup] = useState(false);
  const [captureForm, setCaptureForm] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

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

  const style = [
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
  ];

  const handleToggleCameraPopup = () => {
    if (!cameraPopup) {
      setCameraPopup(true);
    } else {
      setCameraPopup(false);
    }
  };

  const handleOpenCamera = () => {
    if (!cameraPopup || !stream) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((newStream) => {
          setStream(newStream);

          if (videoRef.current) {
            // Forcer la réinitialisation du flux vidéo
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

  // fonction permettant de créer une image en fonction du stream qui apparait
  const handleCaptureCamera = () => {
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

      // convertit l'image en base64
      const imageDataUrl = canvas.toDataURL("image/jpg");

      // sert à récupérer le lien de l'image sur le serveur
      setCapturedImage(imageDataUrl);

      // ouvre le formulaire permettant d'envoyer la photo sur le serveur
      setCaptureForm(true);
    }
  };

  const handleValidateCapture = () => {
    // fonction permettant d'envoyer l'image sur le serveur si l'utilsateur la valide
    // Envoyer l'image sur votre serveur
    // Vous pouvez utiliser une API fetch pour envoyer l'image à votre serveur
    // par exemple, fetch("votre-serveur.com/upload", { method: "POST", body: capturedImage });
    // setCameraPopup(false);
  };

  const handleToggleForm = () => {
    // ferme le formulaire
    setCaptureForm(false);
  };

  return (
    <div style={{ height: "calc(100vh - 83px)" }}>
      <APIProvider apiKey="AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo">
        <Map
          zoom={13}
          center={{ lat: 44.837789, lng: -0.57918 }}
          mapTypeId="roadmap"
          disableDefaultUI
          styles={style}
        >
          {arts.map((art) => (
            <CustomMarker
              key={art.id}
              lat={art.lat}
              lng={art.long}
              text={
                <>
                  <span>{art.name}</span>
                  <br />
                  <span>Auteur: {art.author}</span>
                </>
              }
            />
          ))}
        </Map>
      </APIProvider>
      <div className={`camera-popup${cameraPopup ? " active" : ""}`}>
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
          <div className="capture-form mt-60">
            <img src={capturedImage} alt="captured" style={{ width: "100%" }} />
            <div className="d-flex d-flex-space-arround mt-30">
              <Button
                className="button d-iblock"
                type="button"
                onClick={() => {
                  handleValidateCapture();
                }}
              >
                Valider
              </Button>
              <Button
                color="red"
                className="button d-iblock"
                type="button"
                onClick={() => {
                  handleToggleForm();
                  handleOpenCamera();
                }}
              >
                Refuser
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="camera-button-container">
        {cameraPopup ? (
          <>
            <button
              className="camera-button"
              type="button"
              onClick={() => {
                handleCaptureCamera();
                handleCloseCamera();
              }}
            >
              <img src="./src/assets/camera.png" alt="Faire une capture" />
            </button>
            <button
              className="mt-10"
              onClick={() => {
                handleToggleCameraPopup();
                handleCloseCamera();
              }}
              type="button"
            >
              Fermer
            </button>
          </>
        ) : (
          <button
            className="camera-button"
            type="button"
            onClick={() => {
              handleToggleCameraPopup();
              handleOpenCamera();
            }}
          >
            <img src="./src/assets/camera.png" alt="Ouvre la capture" />
          </button>
        )}
      </div>
    </div>
  );
}
