import teamMarvel from "../assets/img/team-marvel.png";

import "./styles/home.scss";

const Home = () => {
  return (
    <div>
      <div className="presentation-marvel">
        <img src={teamMarvel} alt="team marvel" />
      </div>
    </div>
  );
};

export default Home;
