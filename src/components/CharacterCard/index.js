import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Image from "react-graceful-image";
import { getBase64Image } from "../../helpers/shared";

const Index = ({ id, name, thumbnail, description }) => {
  const imageURL = thumbnail.extension
    ? `${thumbnail.path}.${thumbnail.extension}`
    : `${thumbnail.path}`;

  useEffect(() => {
    if (!thumbnail.extension) {
      let img = document.getElementsByClassName(`character-${id}`);
      img[0].src = imageURL;
      getBase64Image(img[0]);
    }
  });
  return (
    <div className="card character__Cards h-100">
      <div className="image-container">
        <Link to={`/character/${id}`}>
          <Image
            className={`card-img-top character-${id} `}
            src={imageURL}
            alt=""
          />
        </Link>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="character__cards__href card-title text-capitalize">
          {name}
        </h5>
        <p className="card-text text-reduce">
          {description ? description : "No Description available"}
        </p>
        <Link to={`/character/${id}`} className="btn btn-outline-info mt-auto">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Index;
