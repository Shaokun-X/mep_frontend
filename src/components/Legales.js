import React from "react";

export default function Legales({ setLegales, legales }) {
  //go back to previous state
  const Back = () => {
    setLegales(!legales);
  };
  return (
    <div>
      les mentions légales
      <button type="button" className="btn btn-link custom2" onClick={Back}>
        Retour <i className="fas fa-backward" />
      </button>
    </div>
  );
}
