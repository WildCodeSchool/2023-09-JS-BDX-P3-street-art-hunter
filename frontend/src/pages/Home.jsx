/* eslint-disable no-alert */
import React, { useState, useRef, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import CustomMarker from "../components/Marker";
import CustomCircle from "../components/CustomCircle";
import Button from "../components/Button";
import { useLogin } from "../context/LoginContext";
import { useAdminContext } from "../context/AdminContext";
import mapOptions from "../constants/map-options.constant";
import CameraService from "../services/camera.service";

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
  const { streetArt } = useAdminContext();
  const { user, apiService } = useLogin();

  const cameraService = new CameraService(apiService);

  const initialUserLocation = useLoaderData();
  const [userLocation, setUserLocation] = useState(initialUserLocation);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.error("Erreur de géolocalisation: ", error.message);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 83px)",
  };

  const center = userLocation.lat
    ? userLocation
    : { lat: 44.837789, lng: -0.57918 };

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

  // fonction pour fetch la pendingImage
  // const fetchPendingImageData = async (path) => {
  //   try {
  //     await axios.post(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/pendingImages/`,
  //       {
  //         userId: user.id,
  //         imgSrc: path,
  //         uploadDate: getDate(),
  //         uploadTime: getTime(),
  //         latitude: userLocation.lat,
  //         longitude: userLocation.lng,
  //         streetArtId: 27,
  //         status: "pending",
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Erreur lors de la requête Axios:", error);
  //   }
  // };

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
          const file = new File([blob], "fileName.jpg", { type: blob.type });
          setCapturedImage(file);

          // setCapturedImage(blob);
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
        const uploadFile = new FormData();
        uploadFile.append("image", capturedImage);

        const response = await apiService.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/uploads`,
          uploadFile
        );

        const receivedUploadPath = response.data.filePath;

        handleCloseCamera();
        setCaptureForm(false);
        setCameraPopup(false);
        cameraService.fetchPendingImageData(
          receivedUploadPath,
          user,
          userLocation,
          getDate,
          getTime
        );
        alert("Votre image a bien été envoyée");
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'image au serveur :", error);
        // Display a more specific error message based on the error details
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
        options={{ ...mapOptions(), zoom: zoomLevel }}
        onLoad={(loadMap) => setMap(loadMap)}
        onZoomChanged={handleZoomChange}
      >
        {streetArt.map((art) => (
          <CustomMarker
            key={art.id}
            lat={art.latitude}
            lng={art.longitude}
            initialZoomLevel
            text={
              <>
                <span>{art.title}</span>
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
