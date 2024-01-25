import { useEffect } from "react";
import { useCapture } from "../../context/CaptureContext";// eslint-disable-line

export default function Step2() {
  const { videoRef, handleOpenCamera } = useCapture();

  useEffect(() => {
    handleOpenCamera();
  }, []);

  return (
    <div className="d-flex d-flex-center h-100">
      <video ref={videoRef} autoPlay playsInline className="w-100 h-100">
        <track kind="captions" srcLang="en" label="English" />
      </video>
    </div>
  );
}
