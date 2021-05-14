import React from "react";
import Scrollbar from 'smooth-scrollbar';
import lifecycle from 'react-pure-lifecycle';

import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

// create your lifecycle methods
const componentDidMount = (props) => {
  console.log('I mounted! Here are my props: ', props);
};

// make them properties on a standard object
const methods = {
  componentDidMount(props) {
    Scrollbar.init(document.getElementById("nameListScroll"), {
      alwaysShowTracks: true

    });
  }
};

// component
const NameList = ({ likedNames, setList, list }) => {
  //go back to previous state
  const Back = () => {
    setList(!list);
  };

  return (
    <>
      <div className="List mt-3 mb-auto pb-4" id="nameListScroll">
        {likedNames.map((name) => (
          <div key={name.id}>{name.name.charAt(0).toUpperCase() + name.name.slice(1).toLowerCase()}</div>
        ))}
      </div>

      <div className="d-flex justify-content-center mb-2">
        <FacebookShareButton
          className="mr-2"
          url={"https://www.monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            likedNames.map((name) => name.name)
          }
        >
          <FacebookIcon size={36} round />
        </FacebookShareButton>

        <TwitterShareButton
          className="mr-2"
          url={"https://www.monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            likedNames.map((name) => name.name)
          }
        >
          <TwitterIcon size={36} round />
        </TwitterShareButton>

        <WhatsappShareButton
          className="mr-2"
          url={"https://www.monptinom.fr"}
          quote={
            "Alors vous en pensez quoi de mes choix de prénom ? Merci monptinom.fr pour votre aide : \n" +
            likedNames.map((name) => name.name)
          }
        >
          <WhatsappIcon size={36} round />
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
};

export default lifecycle(methods)(NameList);