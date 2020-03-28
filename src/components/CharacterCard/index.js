import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import Image from "react-graceful-image";

import Items from "../Items";
import { getBase64Image } from "../../helpers/shared";

const Index = ({
  id,
  name,
  thumbnail,
  description,
  series,
  stories,
  events,
  openModal,
  details,
  location,
  reduceText,
  imageURL,
}) => {
  return (
    <div className="card character__Cards h-100">
      <Link to={`/character/${id}`}>
        <img
          className={`card-img-top `}
          src={imageURL}
          id={`character-${id}`}
        />
      </Link>
      <div className="card-body">
        <h5 className="character__cards__href card-title text-capitalize">
          {name}
        </h5>
        <p className={`card-text ${reduceText}`}>
          {description ? description : "No Description available"}
        </p>

        {location.includes("character") ? (
          <div>
            <div className="row">
              <Items title="Series" items={series.items} />
              <Items title="Stories" items={stories.items} />
              <Items title="Events" items={events.items} />
            </div>
            <hr />
            <button onClick={openModal} className="btn btn-outline-info">
              Edit
            </button>
            <a
              href={details.find((url) => url.type === "detail").url}
              target="_blank"
              className="float-right btn btn-outline-secondary"
            >
              More Details
            </a>
          </div>
        ) : (
          <Link to={`/character/${id}`} className="btn btn-primary">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
};

const ConnectCharacterCards = ({
  id,
  name,
  thumbnail,
  description,
  series,
  stories,
  events,
  openModal,
  details,
}) => {
  const location = window.location.pathname;
  const reduceText = location.includes("character") ? "" : "text-reduce";
  const imageURL = thumbnail.extension
    ? `${thumbnail.path}.${thumbnail.extension}`
    : `${thumbnail.path}`;

  useEffect(() => {
    if (!thumbnail.extension) {
      let img = document.getElementById(`character-${id}`);
      img.src = imageURL;
      getBase64Image(img);
    }
  }, []);
  return (
    <Index
      id={id}
      name={name}
      thumbnail={thumbnail}
      description={description}
      series={series}
      stories={series}
      events={events}
      openModal={openModal}
      details={details}
      location={location}
      imageURL={imageURL}
      reduceText={reduceText}
    />
  );
};

export default ConnectCharacterCards;
