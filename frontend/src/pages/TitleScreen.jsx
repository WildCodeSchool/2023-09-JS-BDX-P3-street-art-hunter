import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TitleScreen() {
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const handleStartClick = () => {
    setShowOptions(true);
  };
  const goToLogin = () => navigate("/connexion");
  const goToSignup = () => navigate("/inscription");
  const continueAsGuest = () => navigate("/map");

  const handleKeyPress = (callback) => (event) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/map");
    }
  }, [navigate]);

  return (
    <div className="pos-r vh-100">
      <div className="container intro-container h-100">
        <div className="has-two-children d-flex d-flex-column h-100">
          <div className="d-flex d-flex-center">
            <div className="cloud cloud-1" />
            <div className="cloud cloud-2" />
            <img className="logo mt-60" src="src/assets/logo.png" alt="logo" />
          </div>
          <div className="d-flex d-flex-center d-flex-column">
            {!showOptions ? (
              <>
                <h4>Cliquez pour commencer</h4>
                <button onClick={handleStartClick} type="button">
                  <div className="start-btn mt-30">START</div>
                </button>
              </>
            ) : (
              <div className="d-flex d-flex-column">
                <div className="login-button d-flex d-flex-center d-flex-wrap mb-40 t-center">
                  <button
                    type="button"
                    onClick={goToLogin}
                    onKeyDown={handleKeyPress(goToLogin)}
                  >
                    <h4>SE CONNECTER / </h4>
                  </button>
                  <button
                    type="button"
                    onClick={goToSignup}
                    onKeyDown={handleKeyPress(goToSignup)}
                  >
                    <h4>S'INSCRIRE</h4>
                  </button>
                </div>
                <button
                  type="button"
                  onClick={continueAsGuest}
                  onKeyDown={handleKeyPress(continueAsGuest)}
                  className="t-center"
                >
                  <h4>CONTINUER EN TANT QUE VISITEUR</h4>
                </button>
              </div>
            )}
            <div className="hill" />
            <div className="bush" />
          </div>
        </div>
      </div>
      <div className="ground vw-100" />
    </div>
  );
}
