import React from "react";

export default function Confidentialite({
  setConfidentialite,
  confidentialite,
}) {
  //go back to previous state
  const Back = () => {
    setConfidentialite(!confidentialite);
  };
  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <p>
      à propos de la confidentialite
      </p>
      <button type="button" className="btn btn-link custom2" onClick={Back}>
        Retour <i className="fas fa-backward" />
      </button>
    </div>
  );
}
