import React, { useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import CustomMarker from "../components/Marker";
import CustomCircle from "../components/CustomCircle";

export default function Home() {
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

  const userLocation = useLoaderData();

  const containerStyle = {
    width: "100%",
    height: "calc(100vh - 83px)",
  };

  const center = userLocation.lat
    ? userLocation
    : { lat: 44.837789, lng: -0.57918 };

  const [zoomLevel, setZoomLevel] = useState(13); // Initaliser le zoom à 13
  const [map, setMap] = useState(null); // Initialiser la map à null

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

  if (loadError) return <div>Error loading maps</div>; // Si erreur de chargement, afficher un message d'erreur
  if (!isLoaded) return <div>Loading Maps...</div>; // Si chargement en cours, afficher un message de chargement

  return (
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
          initialZoomLevel
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

      {userLocation.lat && (
        <CustomCircle
          lat={userLocation.lat}
          lng={userLocation.lng}
          zoom={zoomLevel}
        />
      )}
    </GoogleMap>
  );
}
