import React, { useState, useEffect } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import CustomMarker from "../components/Marker";
import CustomCircle from "../components/CustomCircle";
import Step1 from "../components/captureSteps/SelectArtStep1";
import Step2 from "../components/captureSteps/OpenCameraStep2";
import Step3 from "../components/captureSteps/CaptureFormStep3";
import { useCapture } from "../context/captureContext"; // eslint-disable-line

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(13); // Initaliser le zoom à 13
  const [map, setMap] = useState(null); // Initialiser la map à null
  const [flashPopup, setFlashPopup] = useState(false);
  const flashTimer = 150;
  const {
    captureImage,
    getNearbyStreetArts,
    handleCloseCamera,
    moveToNextStep,
    setActiveStreetArtId,
    setNearbyArtSelected,
    setStep,
    setUserLocation,
    step,
    streetArt,
    userLocation,
  } = useCapture();

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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo",
  });

  const handleZoomChange = () => {
    // Fonction qui change le zoom
    if (!map) return;
    setZoomLevel(map.getZoom());
  };

  // Simule un flash d'appareil photo lors de la prise de capture
  const handleFlashPopup = () => {
    setFlashPopup(true);

    setTimeout(() => {
      setFlashPopup(false);
    }, flashTimer);
  };

  if (loadError) return <div>Error loading maps</div>; // Si erreur de chargement, afficher un message d'erreur
  if (!isLoaded) return <div>Loading Maps...</div>; // Si chargement en cours, afficher un message de chargement

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
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
        <div className={`camera-popup${step !== "initial" ? " active" : ""}`}>
          <div className="container container-small h-100 d-flex d-flex-center pos-r">
            <button
              className="camera-popup-close-button text-none"
              onClick={() => {
                setStep("initial");
                handleCloseCamera();
                setNearbyArtSelected(null);
                setActiveStreetArtId(null);
              }}
              type="button"
            >
              Fermer
            </button>
            {step === "selectArt" ? <Step1 /> : null}
            {step === "getCapture" ? <Step2 /> : null}
            {step === "captureForm" ? <Step3 /> : null}
          </div>
        </div>
      </div>

      <div className="camera-button-container">
        {step === "initial" && (
          <button
            className="camera-button text-none"
            type="button"
            onClick={() => {
              moveToNextStep();
              getNearbyStreetArts();
            }}
          >
            <img
              className="w-100"
              src="./src/assets/camera.png"
              alt="Ouvre la capture"
            />
            Ouvre
          </button>
        )}
        {step === "getCapture" ? (
          <button
            className="camera-button"
            type="button"
            onClick={() => {
              handleFlashPopup();
              captureImage();
              handleCloseCamera();

              setTimeout(() => {
                moveToNextStep();
              }, flashTimer);
            }}
          >
            <img
              className="w-100"
              src="./src/assets/camera.png"
              alt="Faire une capture"
            />
            prendre
          </button>
        ) : (
          ""
        )}
      </div>
      <div className={`flash-popup${flashPopup ? " active" : ""}`} />
      <audio id="flashSound" src="/src/assets/audio/flash-retro.wav">
        <track kind="captions" />
      </audio>
    </div>
  );
}
