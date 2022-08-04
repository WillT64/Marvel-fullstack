import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./styles/characters.scss";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters");
        console.log(response.data);
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/characters", {
          params: filter,
        });
        console.log(response.data);
        setCharacters(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [filter]);

  const renderCharacters = () => {
    return characters.results.map((elem, index) => {
      const { name, description, thumbnail, _id } = elem;
      const { path, extension } = thumbnail;
      const imgSource = `${path}.${extension}`;

      return (
        <Link to={`/character/${_id}`}>
          <div className="character--card" key={index}>
            <div className="character--title">
              <h2>{name}</h2>
            </div>
            <div className="character--image">
              <img src={imgSource} alt="hero" />
            </div>
            <div className="character--description">
              <p>{description}</p>
            </div>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="characters--page">
      <div className="characters--header">
        <div className="characters--header--infos">
          <h1>Personnages</h1>
        </div>
        <div className="characters--header--filters">
          <button
            onClick={() => {
              setShowFilter(!showFilter);
            }}
          >
            Filters
          </button>
          {showFilter && (
            <>
              <input
                type="text"
                placeholder="Nom"
                onChange={(event) => {
                  let newFilter = { ...filter };
                  newFilter.name = event.target.value;
                  setFilter(newFilter);
                }}
              />
              <input
                type="number"
                placeholder="limit"
                onChange={(event) => {
                  let newFilter = { ...filter };
                  newFilter.limit = event.target.value;
                  setFilter(newFilter);
                }}
              />
              <input
                type="number"
                placeholder="page"
                onChange={(event) => {
                  let newFilter = { ...filter };
                  newFilter.skip = event.target.value;
                  setFilter(newFilter);
                }}
              />
            </>
          )}
        </div>
      </div>
      <div className="characters--container">
        {isLoading ? <p>Chargement des personnages...</p> : renderCharacters()}
      </div>
    </div>
  );
};
export default Characters;
