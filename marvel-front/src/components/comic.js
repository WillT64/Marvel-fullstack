import { useEffect, useState } from "react";
import axios from "axios";

import "./styles/comic.scss";

const Comic = ({ data }) => {
  console.log("~ data", data);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(false);
    }
  }, [data]);

  return (
    <>
      {isLoading ? (
        <p>Chargement du comic...</p>
      ) : (
        <div className="comic--container">
          <div className="comic--title">
            <h3>{data.title}</h3>
          </div>
          <div className="comic--image">
            <img
              src={data.thumbnail.path + "." + data.thumbnail.extension}
              alt={data.title}
            />
          </div>

          {/* <p>{comic.description}</p> */}
        </div>
      )}
    </>
  );
};
export default Comic;
