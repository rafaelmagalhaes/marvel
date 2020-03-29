import React from "react";

const Index = ({ title, items }) => {
  return (
    <div className="col-12 col-xl-4 col-lg-4 col-md-12">
      <h5 className="character__cards__href card-title text-capitalize">
        {title}
      </h5>
      {items.length ? (
        <ul>
          {items.slice(0, 3).map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        `no ${title.toLowerCase()} available`
      )}
    </div>
  );
};

export default Index;
