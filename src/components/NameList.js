import React from "react";

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

export default function NameList({ liked_names, setList, list }) {
  //go back to previous state
  const Back = () => {
    setList(!list);
  };

  return (
    <>
      <div className="List">
        {liked_names.map((name) => (
          <li key={name.id}>{name.name}</li>
        ))}
      </div>

      <div className="d-flex justify-content-center mb-2">
        <FacebookShareButton
          className="mr-2"
          url={"http://monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            liked_names.map((name) => name.name)
          }
        >
          <FacebookIcon size={46} round />
        </FacebookShareButton>

        <TwitterShareButton
          className="mr-2"
          url={"http://monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            liked_names.map((name) => name.name)
          }
        >
          <TwitterIcon size={46} round />
        </TwitterShareButton>

        <WhatsappShareButton
          className="mr-2"
          url={"http://monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            liked_names.map((name) => name.name)
          }
        >
          <WhatsappIcon size={46} round />
        </WhatsappShareButton>
      </div>

      <div className="d-flex justify-content-center">
        <div className="container">
          <button type="button" className="btn btn-link custom2" onClick={Back}>
            Retour <i className="fas fa-backward" />{" "}
          </button>
        </div>
      </div>
    </>
  );
}
