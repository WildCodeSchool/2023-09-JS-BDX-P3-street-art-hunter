import axios from "axios";
import { useEffect, useState } from "react";

export default function Ranking() {
  const [usersRank, setUsersRank] = useState([]);

  const getRanking = async () => {
    try {
      const response = await axios.get(
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
    <div className="allow-scroll-container">
      <h1 className="mb-40">Classement</h1>
      <div className="container ranking-page d-flex d-flex-center of-hidden">
        <div className="allow-scroll">
          {usersRank.map((rank) => (
            <p className="mb-30 mr-30" key={rank.id}>
              <span>
                <img src="/src/assets/coin1.png" alt="coin" /> x {rank.points}
              </span>{" "}
              - {rank.username}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
