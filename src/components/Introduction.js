import React from "react";

export default function Introduction({ setAide, aide }) {
  //go back to previous state
  const Back = () => {
    setAide(!aide);
  };
  return (
    <>
      <h6>Vous cherchez un nom pour votre enfant ? Suivez ces étapes :</h6>

      <ul className="ListInstructions">
        <li> Renseignez le sexe de l'enfant </li>
        <li> Indiquez si vous aimez ou non le prénom proposé </li>
        <li>Formez la liste de vos prénoms préférés </li>
        <li>Partagez votre liste de prénoms </li>
      </ul>
      <button type="button" className="btn btn-link custom2" onClick={Back}>
        Retour <i className="fas fa-backward" />
      </button>
      <div className="prevent_error"></div>
    </>
  );
}
