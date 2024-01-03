import React from "react";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { useLoaderData } from "react-router-dom";
import CustomMarker from "../components/Marker";

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

  const mapOptions = {
    zoom: 13,
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

  return (
    <LoadScript googleMapsApiKey="AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        options={mapOptions}
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

        {userLocation.lat && <MarkerF position={userLocation} radius={100} />}
      </GoogleMap>
    </LoadScript>
  );
}
