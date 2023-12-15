import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from "@vis.gl/react-google-maps";

export default function Home() {
  const arts = [
    {
      id: 1,
      name: "Le-pigeon",
      author: "A-mo",
      lat: 44.821308,
      long: -0.551763,
    },
    {
      id: 2,
      name: "Cosmic-Visitor",
      author: "Inconnu",
      lat: 44.825882,
      long: -0.548732,
    },
    {
      id: 3,
      name: "Plaisir-de-faire",
      author: "Inconnu",
      lat: 44.833581,
      long: -0.565358,
    },
  ];

  return (
    <div style={{ height: "calc(100vh - 83px)" }}>
      <APIProvider apiKey="AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo">
        <Map
          zoom={13}
          center={{ lat: 44.837789, lng: -0.57918 }}
          mapId="e7f01672d9e16a33"
        >
          {arts.map((art) => (
            <AdvancedMarker
              className={art.name}
              position={{ lat: art.lat, lng: art.long }}
            >
              <h2>{art.name}</h2>
              <p>Auteur: {art.author}</p>
              <Pin
                background="#cc0000"
                glyphColor="#000"
                borderColor="#660000"
                scale={1.2}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
