import { useNavigate, useOutletContext } from "react-router-dom";
import Button from "../components/Button";
import ItemList from "../components/ItemList";
import Slider from "../components/Slider";
import { useLogin } from "../context/LoginContext";
import { useAdminContext } from "../context/AdminContext";
import coin from "../assets/coin.gif";

export default function Account() {
  const { logout } = useLogin();
  const { removeUser } = useAdminContext();
  const { user } = useLogin();
  const navigate = useNavigate();

  const handleDelete = async () => {
    removeUser(user.id);
    logout();
  };

  const { userCaptures } = useOutletContext();

  return (
    <div className="allow-scroll-container">
      <div>
        <h1>Mon compte</h1>
        <h3 className="score t-center">
          <img src={coin} alt="coin" /> x {user.points}
        </h3>
      </div>
      <Slider
        leftValue="Infos"
        rightValue="Arts"
        linkOne="/mon-compte/informations"
        linkTwo="/mon-compte/arts"
      >
        <div className="slider-item">
          <div className="container">
            <div className="allow-scroll">
              <div className="container">
                <div className="d-flex d-flex-center">
                  <div>
                    <p className="mb-20">Pseudo : {user.username}</p>
                    <p className="mb-20">Mail : {user.email}</p>
                    <p className="mb-20">Code Postal : {user.postcode}</p>
                    <p className="mb-20">Ville : {user.city}</p>
                    <Button
                      color="yellow"
                      className="button mt-40"
                      onClick={() => navigate("/mon-compte/modifier")}
                    >
                      Modifier
                    </Button>
                    <Button
                      color="red"
                      className="button mt-40"
                      onClick={logout}
                    >
                      Se déconnecter
                    </Button>
                    <Button
                      color="red"
                      className="button mt-40"
                      onClick={handleDelete}
                    >
                      Supprimer mon compte
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="slider-item">
          <div className="container">
            <p className="t-center tiny-text mb-20">
              <span className="pastille" />
              Validée <span className="pastille yellow" />
              En attente <span className="pastille red" />
              Refusée
            </p>
            <div className="allow-scroll">
              <div className="container list-container">
                {userCaptures?.map((item) => (
                  <ItemList
                    key={item.id}
                    className={`has-img ${item.status ?? ""} captures mb-20`}
                  >
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/${item.imgSrc}`}
                      alt={item.name}
                    />
                    <div className="item-infos">
                      <h5 className="mb-10">
                        #{item.id} - {item.streetArtTitle}
                      </h5>
                      <p className="mb-10">Par {item.streetArtAuthor}</p>
                      <p className="tiny-text">
                        Capturé le {item.formattedUploadDate} à{" "}
                        {item.formattedUploadTime}
                      </p>
                    </div>
                  </ItemList>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}
