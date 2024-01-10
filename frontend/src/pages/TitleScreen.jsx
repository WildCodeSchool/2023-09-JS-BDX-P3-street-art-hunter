export default function TitleScreen() {
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
            <h4>Cliquez pour commencer</h4>
            <span className="start-btn mt-30">START</span>
            <div className="hill" />
            <div className="bush" />
          </div>
        </div>
      </div>
      <div className="ground vw-100" />
    </div>
  );
}
