export default function TitleScreen() {
  return (
    <div className="pos-r vh-100">
      <div className="container intro-container h-100">
        <div className="has-two-children d-flex d-flex-column h-100">
          <div className="d-flex d-flex-center">
            <img className="logo mt-60" src="src/assets/logo.png" alt="logo" />
          </div>
          <div className="d-flex d-flex-center">
            <h4>Cliquez pour commencer</h4>
          </div>
        </div>
      </div>
      <div className="ground vw-100" />
    </div>
  );
}
