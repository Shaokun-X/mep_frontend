import React from "react";

export default function Propos({ setPropos, propos }) {
  //go back to previous state
  const Back = () => {
    setPropos(!propos);
  };
  return (
    <div className="mt-4 d-flex flex-column align-items-center">
      <p>
      a propos
      </p>
      <button type="button" className="btn btn-link custom2" onClick={Back}>
        Retour <i className="fas fa-backward" />
      </button>
    </div>
  );
}
