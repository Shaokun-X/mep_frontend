import React from "react";

export default function SexChoice({ setSexe }) {
  //set the baby's name
  const handleChange = (event) => {
    setSexe(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center">
      <button
        type="button"
        className="btn btn-outline-success btn-lg mr-2  custom"
        onClick={handleChange}
        value="m"
      >
        Garçon
      </button>
      <button
        type="button"
        className="btn btn-outline-success btn-lg mr-2  custom"
        onClick={handleChange}
        value="f"
      >
        Fille
      </button>
    </div>
  );
}
