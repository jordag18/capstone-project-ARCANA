import React from "react";

interface ToaIconCardProp {
  imageSrc: string;
  cardTitle: string;
  isDefault: boolean;
}

const ToaIconCard: React.FC<ToaIconCardProp> = ({
  imageSrc,
  cardTitle,
  isDefault,
}) => {
  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={imageSrc} />
      </figure>
      <div className="card-body flex-row justify-between">
        <div className="flex flex-col">
          <h2 className="card-title">{cardTitle}</h2>
          <p>{isDefault ? "Default" : null}</p>
        </div>
        <div className="card-actions">
          <button className="btn btn-neutral">Edit</button>
          <button className="btn bg-red-400">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default ToaIconCard;
