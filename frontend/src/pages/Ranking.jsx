import { useEffect, useState } from "react";
import { useLogin } from "../context/LoginContext";
import miniCoin from "../assets/coin1.png";

export default function Ranking() {
  const [usersRank, setUsersRank] = useState([]);
  const { apiService } = useLogin();

  const getRanking = async () => {
    try {
      const response = await apiService.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/ranks/`
      );
      setUsersRank(response.data[0]);
    } catch (error) {
      console.error("Error getting ranking");
    }
  };

  useEffect(() => {
    getRanking();
  }, []);

  return (
    <div className="allow-scroll-container pos-r">
      <h1 className="mb-40">Classement</h1>
      <div className="container ranking-page d-flex d-flex-center of-hidden">
        <div className="allow-scroll">
          {usersRank.map((rank) => (
            <p className="mb-30" key={rank.id}>
              <span>
                <img src={miniCoin} alt="coin" /> x {rank.points}
              </span>{" "}
              - {rank.username}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
