import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useAdminContext } from "./AdminContext";
import { useLogin } from "./LoginContext";

const CaptureContext = createContext();

export default function CaptureContextProvider({ children }) {
  const initialUserLocation = useLoaderData();
  const [userLocation, setUserLocation] = useState(initialUserLocation);
  const { streetArt } = useAdminContext();
  const { user, apiService } = useLogin();
  const videoRef = useRef(null);
  const [step, setStep] = useState("initial");
  const [cameraPopup, setCameraPopup] = useState(false);
  const [captureForm, setCaptureForm] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const [nearbyStreetArtId, setNearbyStreetArtId] = useState(null);
  const [nearbyStreetArts, setNearbyStreetArts] = useState([]);
  const [nearbyArtSelected, setNearbyArtSelected] = useState(null);
  const [activeStreetArtId, setActiveStreetArtId] = useState(null);

  const moveToNextStep = () => {
    setStep((prevStep) => {
      if (prevStep === "initial") return "selectArt";
      if (prevStep === "selectArt") return "getCapture";
      if (prevStep === "getCapture") return "captureForm";
      if (prevStep === "captureForm") return "end";
      return prevStep;
    });
  };

  const notify = (message) =>
    toast.success(message, {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const moveToPreviousStep = () => {
    setStep((prevStep) => {
      if (prevStep === "selectArt") return "initial";
      if (prevStep === "getCapture") return "selectArt";
      if (prevStep === "captureForm") return "getCapture";
      if (prevStep === "end") return "captureForm";
      return prevStep;
    });
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

  // fonction pour fetch la pendingImage
  const fetchPendingImageData = async (path) => {
    try {
      await apiService.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/pendingImages/`,
        {
          userId: user.id,
          imgSrc: path,
          uploadDate: getDate(),
          uploadTime: getTime(),
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          streetArtId: nearbyArtSelected,
          status: "pending",
        }
      );
    } catch (error) {
      console.error("Erreur lors de la requête Axios:", error);
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

  // Gestion de l'ouverture et fermeture de la caméra de l'utilisateur
  const handleOpenCamera = async () => {
    // Ferme la caméra si elle est ouverte et que la nouvelle étape n'est pas "getCapture"
    if (stream && step !== "getCapture") {
      handleCloseCamera();
      return;
    }

    // Ouvre la caméra en demandant les droits d'accès au navigateur
    if (step === "getCapture" && (!cameraPopup || !stream)) {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        setStream(newStream);

        if (videoRef.current) {
          // Réinitialise le flux vidéo
          videoRef.current.srcObject = null;
          videoRef.current.srcObject = newStream;

          // Attendez que la caméra soit prête avant de continuer
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        }
      } catch (error) {
        console.error(
          "Erreur lors de l'ouverture de l'appareil photo :",
          error
        );
      }
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
        const userToken = localStorage.getItem("token");

        const response = await axios({
          method: "POST",
          url: `${import.meta.env.VITE_BACKEND_URL}/api/uploads/`,
          data: uploadFile,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.status === 200) {
          const receivedUploadPath = response.data.filePath;

          handleCloseCamera();
          setCaptureForm(false);
          setCameraPopup(false);
          fetchPendingImageData(receivedUploadPath);
          notify("Votre image a bien été envoyée.");
        } else {
          console.error("Erreur lors de l'envoi de l'image au serveur");
        }
      } catch (error) {
        console.error("Erreur lors de la requête fetch :", error);
      }
    }
  };

  // Gestion la prise de photo
  const captureImage = () => {
    handleCaptureCamera();
    handleCloseCamera();

    const flashAudio = document.getElementById("flashSound");
    if (flashAudio) {
      flashAudio.play();
    }
  };

  // Fonction pour calculer la distance entre deux points géographiques en utilisant la formule haversine
  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371 * 1000; // Rayon de la Terre en mètres
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en mètres
    return distance;
  }

  const isUserNearStreetArt = (streetArtLocation) => {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      streetArtLocation.lat,
      streetArtLocation.lng
    );
    return distance < 3000; // distance en mètres
  };

  // Calcule les street arts proches
  const getNearbyStreetArts = () => {
    const nearbyArts = streetArt
      .filter((art) =>
        isUserNearStreetArt({ lat: art.latitude, lng: art.longitude })
      )
      .sort((artA, artB) => {
        // Trie du plus proche au plus loin
        const distanceA = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          artA.latitude,
          artA.longitude
        );
        const distanceB = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          artB.latitude,
          artB.longitude
        );

        return distanceA - distanceB;
      });

    setNearbyStreetArts(nearbyArts);
  };

  const handleStreetArtClick = (streetArtId) => {
    // Définissez l'ID de l'œuvre d'art de rue cliquée comme active
    setActiveStreetArtId(streetArtId);
  };

  const contextCaptureValue = useMemo(
    () => ({
      activeStreetArtId,
      calculateDistance,
      captureForm,
      captureImage,
      capturedImage,
      getNearbyStreetArts,
      handleCloseCamera,
      handleOpenCamera,
      handleStreetArtClick,
      handleValidateCapture,
      moveToNextStep,
      moveToPreviousStep,
      nearbyArtSelected,
      nearbyStreetArtId,
      nearbyStreetArts,
      setActiveStreetArtId,
      setCameraPopup,
      setCaptureForm,
      setCapturedImage,
      setNearbyArtSelected,
      setNearbyStreetArtId,
      setNearbyStreetArts,
      setStep,
      setStream,
      setUserLocation,
      step,
      stream,
      streetArt,
      user,
      userLocation,
      videoRef,
    }),
    [
      step,
      setStep,
      moveToNextStep,
      moveToPreviousStep,
      cameraPopup,
      setCameraPopup,
      captureForm,
      setCaptureForm,
      capturedImage,
      setCapturedImage,
      stream,
      setStream,
      nearbyStreetArtId,
      setNearbyStreetArtId,
      nearbyStreetArts,
      setNearbyStreetArts,
      nearbyArtSelected,
      setNearbyArtSelected,
      activeStreetArtId,
      setActiveStreetArtId,
      handleOpenCamera,
      userLocation,
      setUserLocation,
      getNearbyStreetArts,
      streetArt,
      user,
      calculateDistance,
      handleStreetArtClick,
      captureImage,
      handleOpenCamera,
      handleCloseCamera,
      videoRef,
      handleValidateCapture,
    ]
  );

  return (
    <CaptureContext.Provider value={contextCaptureValue}>
      {children}
    </CaptureContext.Provider>
  );
}

CaptureContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CaptureContext, CaptureContextProvider };
export const useCapture = () => useContext(CaptureContext);
