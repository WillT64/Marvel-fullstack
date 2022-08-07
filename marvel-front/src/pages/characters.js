import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "./styles/characters.scss";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [showBtnFilter, setShowBtnFilter] = useState(true);
  const [filter, setFilter] = useState({ name: "", limit: "100", skip: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://exo-marvel-backend.herokuapp.com/characters"
        );
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
        setIsLoading(true);
        const response = await axios.get(
          "https://exo-marvel-backend.herokuapp.com/characters",
          {
            params: filter,
          }
        );
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

  const showFilters = () => {
    return (
      <>
        <div className="input--filter">
          <label for="name">Nom du héro : </label>
          <input
            type="text"
            id="name"
            placeholder=""
            onChange={(event) => {
              let newFilter = { ...filter };
              newFilter.name = event.target.value;
              newFilter.skip = 0;
              setFilter(newFilter);
            }}
          />
        </div>
        <div className="input--filter">
          <label for="limit">Limite par page : </label>
          <input
            type="number"
            id="limit"
            placeholder=""
            onChange={(event) => {
              let newFilter = { ...filter };
              newFilter.limit = event.target.value;
              setFilter(newFilter);
            }}
          />
        </div>
      </>
    );
  };

  const showPages = () => {
    return (
      <div className="page-manager">
        <span>Page : </span>
        <button
          onClick={() => {
            let newFilter = { ...filter };
            newFilter.skip = +filter.skip - 1;
            setFilter(newFilter);
          }}
        >
          -
        </button>
        <span>{+filter.skip + 1 || 1}</span>
        <button
          onClick={() => {
            let newFilter = { ...filter };
            newFilter.skip = +filter.skip + 1;
            setFilter(newFilter);
          }}
        >
          +
        </button>
      </div>
    );
  };

  return (
    <div className="characters--page">
      <div className="characters--header">
        <div className="characters--header--infos">
          <h1>Personnages</h1>
        </div>
        <div className="characters--header--filters">
          {showBtnFilter && (
            <button
              onClick={() => {
                setShowFilter(!showFilter);
                setShowBtnFilter(false);
              }}
            >
              Rechercher
            </button>
          )}

          {showFilter && showFilters()}
        </div>
      </div>
      <div className="characters--body">
        {isLoading ? (
          <p>Chargement des personnages...</p>
        ) : (
          <>
            <div className="characters--container">{renderCharacters()}</div>
            {showPages()}
          </>
        )}
      </div>
    </div>
  );
};
export default Characters;
