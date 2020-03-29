import React from "react";
import Image from "react-graceful-image";

import Items from "../Items";

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
}) => {
  const imageURL = thumbnail.extension
    ? `${thumbnail.path}.${thumbnail.extension}`
    : `${thumbnail.path}`;

  return (
    <div className="row">
      <div className="col-12 col-xl-6 col-lg-6 col-md-12 ">
        <Image
          className={`card-img-top character-${id} `}
          src={imageURL}
          alt=""
        />
      </div>
      <div className="col-12 col-xl-6 col-lg-6 col-md-12">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-body d-flex flex-column">
            <h5 className="character__cards__href card-title text-capitalize">
              {name}
            </h5>
            <p className="card-text">
              {description ? description : "No Description available"}
            </p>
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
                rel="noopener noreferrer"
                className="float-right btn btn-outline-secondary"
              >
                More Details
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
