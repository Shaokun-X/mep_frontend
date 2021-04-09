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
    <div>
      à propos de la confidentialite
      <button type="button" className="btn btn-link custom2" onClick={Back}>
        Retour <i className="fas fa-backward" />
      </button>
    </div>
  );
}
