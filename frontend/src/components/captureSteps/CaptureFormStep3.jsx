import { useCapture } from "../../context/captureContext";// eslint-disable-line
import Button from "../Button";

export default function Step3() {
  const { capturedImage, handleValidateCapture, moveToPreviousStep, setStep } =
    useCapture();

  return (
    <div className="capture-form">
      <img
        src={URL.createObjectURL(new Blob([capturedImage]))}
        alt="captured"
        className="capture-preview w-100"
      />

      <div className="d-flex d-flex-space-around mt-30">
        <Button
          className="button"
          type="button"
          onClick={() => {
            handleValidateCapture();
            setStep("initial");
          }}
        >
          Envoyer
        </Button>
        <Button
          color="red"
          className="button"
          type="button"
          onClick={() => {
            // setCaptureForm(true);
            moveToPreviousStep();
          }}
        >
          Restart
        </Button>
      </div>
    </div>
  );
}
