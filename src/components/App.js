import React, { useState } from "react";
import "./App.css";

import Logo from "../assets/monptinom-logo.png";
import Logo_bas from "../assets/monptinom-logo-basdepage.png";
import Ballon from "../assets/monptinom-ballons.png";

import Propos from "./Propos";
import Legales from "./Legales";
import Confidentialite from "./Confidentialite";

import NameList from "./NameList";
import Introduction from "./Introduction";
import SexChoice from "./SexChoice";
import NameChoice from "./NameChoice";

function App() {
  const [sexe, setSexe] = useState("NA");
  const [list, setList] = useState(false);
  const [aide, setAide] = useState(false);
  const [name, setName] = useState(null);
  const [liked_names, setLikedNames] = useState([]);

  const [id, setId] = useState(null);
  const [idList, setidList] = useState([]);
  const [idLike, setidLike] = useState([]);
  const [iteration, setIteration] = useState(0);
  const [refus, setRefus] = useState(0);
  const [LikeLink, setLikeLink] = useState([]);


  const [propos, setPropos] = useState(false);
  const [legales, setLegales] = useState(false);
  const [confidentialite, setConfidentialite] = useState(false);

  return (
    <div className="container">
      <div className="content">
        <img
          src={Logo}
          alt="Logo"
          style={{ height: "226px", width: "365px", margin: "20px" }}
        />

        {propos === true ? (
          <Propos setPropos={setPropos} propos={propos} />
        ) : legales === true ? (
          <Legales setLegales={setLegales} legales={legales} />
        ) : confidentialite === true ? (
          <Confidentialite
            setConfidentialite={setConfidentialite}
            confidentialite={confidentialite}
          />
        ) : sexe === "NA" ? (
          <SexChoice setSexe={setSexe} />
        ) : list === true ? (
          <NameList setList={setList} list={list} liked_names={liked_names} />
        ) : aide === true ? (
          <Introduction setAide={setAide} aide={aide} />
        ) : (
          <NameChoice
            name={name}
            setName={setName}
            setAide={setAide}
            aide={aide}
            sexe={sexe}
            setSexe={setSexe}
            list={list}
            setList={setList}
            liked_names={liked_names}
            setLikedNames={setLikedNames}
            refus={refus}
            setRefus={setRefus}
            iteration={iteration}
            setIteration={setIteration}
            id={id}
            setId={setId}
            idList={idList}
            setidList={setidList}
            idLike={idLike}
            setidLike={setidLike}
            setLikeLink={setLikeLink}
            LikeLink={LikeLink}
          />
        )}

        <img className="ballon" src={Ballon} alt="Ballon" />
      </div>

      <nav className="navbar navbar-expand-lg fixed-bottom navbar-light ">
        <a className="navbar-brand " href="/">
          <img className="logo" src={Logo_bas} alt="Logo" />
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarText">
          <ul
            className="navbar-nav d-flex flex-column mx-auto "
            style={{ fontSize: "12px", alignItems: "center" }}
          >
            <li>Copyright c 2021</li>
            <li>Powered by</li>
            <li>MXCDATA</li>
          </ul>

          <span className="navbarText">
            <button
              type="button"
              className="btn btn-link btn-sm mr-2"
              onClick={() =>
                setPropos(!propos) +
                setConfidentialite(false) +
                setLegales(false)
              }
            >
              A propos
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm mr-2"
              onClick={() =>
                setLegales(!legales) +
                setPropos(false) +
                setConfidentialite(false)
              }
            >
              Mentions légales
            </button>
            <button
              type="button"
              className="btn btn-link btn-sm mr-2"
              onClick={() =>
                setConfidentialite(!confidentialite) +
                setPropos(false) +
                setLegales(false)
              }
            >
              Politiques de confidentialité
            </button>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default App;
