import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Comic from "../components/comic";

import "./styles/character-sheet.scss";

const CharacterSheet = () => {
  const { id } = useParams();
  const [characterAndComics, setCharacterAndComics] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterAndComics = async () => {
      try {
        const response = await axios.get(
          `https://exo-marvel-backend.herokuapp.com/comics/${id}`
        );
        setCharacterAndComics(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("errorFetchDataComics", error);
      }
    };

    fetchCharacterAndComics();
  }, [id]);

  const renderCharacter = () => {
    const imgSource = `${characterAndComics.thumbnail.path}.${characterAndComics.thumbnail.extension}`;
    return (
      <>
        {/* <div className="character-sheet--title">
          <h1>{characterAndComics.name}</h1>
        </div> */}
        <div className="character-sheet--container">
          <div className="character-sheet--comics">
            {/* <h2>Apparait dans les comics suivants:</h2> */}
            <div className="character-sheet--comics-list">
              {characterAndComics.comics.map((comic, index) => {
                return (
                  <div className="character-sheet--comics-item">
                    <Comic data={comic} key={index} />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="character-sheet--infos">
            <div className="character-sheet--image">
              <div>
                <h2>{characterAndComics.name}</h2>
              </div>
              <div>
                <img src={imgSource} alt="hero" />
              </div>
            </div>

            <div className="character-sheet--description">
              <p>{characterAndComics.description}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="character-sheet--page">
      {isLoading ? (
        <p>Chargement de la fiche personnage...</p>
      ) : (
        renderCharacter()
      )}
    </div>
  );
};
export default CharacterSheet;
