import { useCapture } from "../../context/CaptureContext"; // eslint-disable-line
import Button from "../Button";
import ItemList from "../ItemList";

export default function Step1() {
  const {
    activeStreetArtId,
    calculateDistance,
    handleStreetArtClick,
    moveToNextStep,
    nearbyStreetArts,
    setNearbyArtSelected,
    userLocation,
  } = useCapture();

  return (
    <div className="allow-scroll-container">
      <div>
        <h5 className="t-center mt-40 mb-30">
          Sélectionnez le street art à capturer :
        </h5>

        <Button
          className={`button mi-auto mb-30${
            activeStreetArtId === null ? " hidden" : ""
          }`}
          onClick={() => {
            setNearbyArtSelected(activeStreetArtId);
            moveToNextStep();
          }}
        >
          Valider
        </Button>
      </div>
      <div className="allow-scroll">
        <div className="select-street-art-list list-container container">
          {nearbyStreetArts.map((item) => (
            <ItemList
              key={item.id}
              className={`has-img mb-20${
                item.id === activeStreetArtId ? " active" : ""
              }`}
            >
              <button
                className="w-100 h-100"
                type="button"
                onClick={() => handleStreetArtClick(item.id)}
              >
                <img src={item.image} alt={item.title} />
                <div className="item-infos">
                  <h5 className="mt-10 mb-10">
                    #{item.id} - {item.title}
                  </h5>
                  <h5>
                    {" "}
                    {calculateDistance(
                      item.longitude,
                      item.latitude,
                      userLocation.lng,
                      userLocation.lat
                    ).toFixed(1)}
                    m
                  </h5>
                </div>
              </button>
            </ItemList>
          ))}
        </div>
      </div>
    </div>
  );
}
