import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function Home() {
  return (
    <div style={{ height: "calc(100vh - 83px)" }}>
      <APIProvider apiKey="AIzaSyBvteHlt2nfprfyLXqGWNdTohSw_fsrWUo">
        <Map zoom={10} center={{ lat: 44.837789, lng: -0.57918 }} />
      </APIProvider>
    </div>
  );
}
