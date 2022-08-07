import { useEffect, useState } from "react";
import axios from "axios";

import "./styles/comics.scss";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState({});
  console.log("~ filter", filter);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          "https://exo-marvel-backend.herokuapp.com/comics"
        );
        console.log(response.data);
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComics();
  }, []);

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          "https://exo-marvel-backend.herokuapp.com/comics",
          {
            params: filter,
          }
        );
        console.log(response.data);
        setComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComics();
  }, [filter]);

  const renderCharacters = () => {
    return comics.results.map((elem, index) => {
      const { title, description, thumbnail } = elem;
      const { path, extension } = thumbnail;
      const imgSource = `${path}.${extension}`;

      return (
        <div className="character--card" key={index}>
          <div className="character--title">
            <h2>{title}</h2>
          </div>
          <div className="character--image">
            <img src={imgSource} alt="hero" />
          </div>
          <div className="character--description">
            <p>{description}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="characters--page">
      <div className="characters--header">
        <div className="characters--header--infos">
          <h1>Comics</h1>
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
                placeholder="title"
                onChange={(event) => {
                  let newFilter = { ...filter };
                  newFilter.title = event.target.value;
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
          )}{" "}
        </div>
      </div>
      <div className="characters--container">
        {isLoading ? <p>Chargement des comics...</p> : renderCharacters()}
      </div>
    </div>
  );
};
export default Comics;
