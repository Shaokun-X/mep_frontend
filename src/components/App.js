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


// load the very first names from database.
const veryFirstNames = { boy: {}, girl: {} }
let xhr = new XMLHttpRequest();

// `false` makes the request synchronous, so that users won't see the loading
xhr.open('GET', 'https://www.monptinom.fr/index.php', false);
xhr.send(null);
if (xhr.status === 200) {
  let data = JSON.parse(xhr.responseText);
  veryFirstNames.boy = { id: data[0].id, name: data[0].nom };
  veryFirstNames.nextBoyY = { id: data[1].id, name: data[1].nom };
  veryFirstNames.nextBoyN = { id: data[2].id, name: data[2].nom };
  veryFirstNames.girl = { id: data[3].id, name: data[3].nom };
  veryFirstNames.nextGirlY = { id: data[4].id, name: data[4].nom };
  veryFirstNames.nextGirlN = { id: data[5].id, name: data[5].nom };
}


function App() {
  // sex, used in namechoice to request name, decided by sexchoice
  const [sexe, setSexe] = useState("NA");
  // name, used only in namechoice
  const [name, setName] = useState(null);
  // NOTE: there is no need to use sperated two states to store both and name, this makes double renders every time update name
  // liked names, used only in namechoice
  const [likedNames, setLikedNames] = useState([]);
  // id of current name, used only in namechoice
  const [id, setId] = useState(null);
  // all handled ids, used only in namechoice
  // NOTE: should have used Set
  const [idList, setidList] = useState([]);

  // algo related, used only in namechoice
  const [refus, setRefus] = useState(0);

  // following are flags, determine which compnents to display
  const [list, setList] = useState(false);
  const [aide, setAide] = useState(false);
  const [propos, setPropos] = useState(false);
  const [legales, setLegales] = useState(false);
  const [confidentialite, setConfidentialite] = useState(false);

  // enable flat of choice buttons
  const [enableChoice, setEnableChoice] = useState(true);

  // anytime the user restart the selection, the initial names would be ready at once.
  // preloaded names, an array that contains two possible results
  const [nextYesName, setNextYesName] = useState({ id: {}, name: {} });
  const [nextNoName, setNextNoName] = useState({ id: {}, name: {} });


  return (
    <div className="container container--full">
      <div className="content">
        <img
          src={Logo}
          alt="Logo"
          className="banner"
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
          <SexChoice setSexe={setSexe} 
          initialNames={veryFirstNames}
          setName={setName}
          setId={setId}
          setNextYesName={setNextYesName}
          setNextNoName={setNextNoName}/>
        ) : list === true ? (
          <NameList setList={setList} list={list} likedNames={likedNames} />
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
            likedNames={likedNames}
            setLikedNames={setLikedNames}
            refus={refus}
            setRefus={setRefus}
            id={id}
            setId={setId}
            idList={idList}
            setidList={setidList}
            nextYesName={nextYesName}
            setNextYesName={setNextYesName}
            nextNoName={nextNoName}
            setNextNoName={setNextNoName}
            enableChoice={enableChoice}
            setEnableChoice={setEnableChoice}
          />
        )}

        <img className="ballon" src={Ballon} alt="Ballon" />
      </div>

      <nav className="navbar navbar-expand-lg mt-auto navbar-light ">
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
            className="navbar-nav d-flex mx-auto flex-row flex-md-column justify-content-around"
            style={{ fontSize: "12px", alignItems: "center" }}
          >
            <li>Copyright &#169; 2021</li>
            <li>Powered by</li>
            <li>MXCDATA</li>
          </ul>

          <span className="navbarText d-flex justify-content-around mt-3 mt-lg-0">
            <button
              type="button"
              className="btn btn-link btn-sm"
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
              className="btn btn-link btn-sm"
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
              className="btn btn-link btn-sm"
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
