import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ComicPage = () => {
  const { id } = useParams();
  const [comic, setComic] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterAndComics = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/comic/${id}`);
        setComic(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("errorFetchDataComics", error);
      }
    };

    fetchCharacterAndComics();
  }, [id]);

  return (
    <div>
      <h1>ComicPage</h1>
      <p>{id}</p>
    </div>
  );
};
export default ComicPage;
