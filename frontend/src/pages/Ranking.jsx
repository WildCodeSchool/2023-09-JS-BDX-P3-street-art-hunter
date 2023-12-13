const usersRank = [
  {
    id: 1,
    name: "Leslie",
    points: "15 000",
  },
  {
    id: 2,
    name: "Antoine",
    points: "11 000",
  },
  {
    id: 3,
    name: "Fréd",
    points: "8 000",
  },
  {
    id: 4,
    name: "Claire",
    points: "8 000",
  },
  {
    id: 5,
    name: "Marie",
    points: "7 985",
  },
  {
    id: 6,
    name: "Lucas",
    points: "6 000",
  },
  {
    id: 7,
    name: "Anaelle",
    points: "5 500",
  },
  {
    id: 8,
    name: "Raph",
    points: "4 000",
  },
];
export default function Ranking() {
  return (
    <div>
      <h1 className="mb-40">Classement</h1>
      <div className="container ranking-page">
        <div className="allow-scroll">
          {usersRank.map((rank) => (
            <p className="mb-30" key={rank.id}>
              <span>
                {" "}
                <img src="/src/assets/coin1.png" alt="coin" /> x {rank.points}
              </span>{" "}
              - {rank.name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
