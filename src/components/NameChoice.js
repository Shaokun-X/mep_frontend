import React from "react";
import axios from "axios";
import qs from "qs";

export default function NameChoice({
  name,
  setName,
  sexe,
  setSexe,
  aide,
  setAide,
  list,
  setList,
  likedNames,
  setLikedNames,
  refus,
  setRefus,
  id,
  setId,
  idList,
  setidList,
  nextYesName,
  setNextYesName,
  nextNoName,
  setNextNoName,
  enableChoice,
  setEnableChoice,
}) {
  // Reset all parameters
  const Reset = () => {
    setSexe("NA");
    setLikedNames([]);
    setName(nextNoName.name);
    setId(nextNoName.id);
    setidList([]);
    setRefus(0);
    setEnableChoice(true);
    // let randomIndex = Math.floor(Math.random() * idList.length);
    // preload([idList[randomIndex]], [idList[randomIndex]], [-1], 0);
  };

  // change to list name component
  const List = () => {
    if (likedNames.length === 0)
      alert("Formez avant votre liste de prénoms !");
    else setList(!list);
  };

  const onChooseNo = () => {

    // update of states is asyncronous, so we store them locally then pass them to API request methods
    const updatedLikedNames = likedNames.concat({ name: name, id: id });
    const likedNameIds = updatedLikedNames.map((e, i) => { return e.id });
    const proposedIds = idList.concat(id);
    setidList(proposedIds);

    // preview* varables contains the ID of previous nextName
    let previewProposedIds = [...proposedIds];
    previewProposedIds.push(nextNoName.id);
    let previewNoLikedNameIds = [...likedNameIds];
    let previewYesLikedNameIds = [...likedNameIds];
    previewYesLikedNameIds.push(nextYesName.id);
    let previewRefus = refus + 2;
    
    setRefus(refus + 1);
    // replace display name with preloaded next name
    setName(nextNoName.name);
    setId(nextNoName.id);

    // if the id of next name is NaN, that means all names in DB has been viewed
    if (isNaN(nextYesName.id) || isNaN(nextNoName.id)) {
      setEnableChoice(false);
      // prepare to restart
      let randomIndex = Math.floor(Math.random() * idList.length);
      preload([idList[randomIndex]], [idList[randomIndex]], [], 0);
    } else {
      // recommendation logic, preload the next name
      preload(previewProposedIds, previewYesLikedNameIds, previewNoLikedNameIds, previewRefus);
    }

    document.activeElement.blur();
  };

  const onChooseYes = () => {
    // update of states is asyncronous, so we store them locally then pass them to API request methods
    const updatedLikedNames = likedNames.concat({ name: name, id: id });
    const likedNameIds = updatedLikedNames.map((e, i) => { return e.id });
    const proposedIds = idList.concat(id);
    setLikedNames(updatedLikedNames);
    setidList(proposedIds);

    
    // preview* varables contains the ID of previous nextName
    let previewProposedIds = [...proposedIds];
    previewProposedIds.push(nextYesName.id);
    let previewNoLikedNameIds = [...likedNameIds];
    let previewYesLikedNameIds = [...likedNameIds];
    previewYesLikedNameIds.push(nextYesName.id);
    let previewRefus = refus + 1;

    // replace display name with preloaded next name
    setName(nextYesName.name);
    setId(nextYesName.id);

    // if the id of next name is NaN, that means all names in DB has been viewed
    if (isNaN(nextYesName.id) || isNaN(nextNoName.id)) {
      setEnableChoice(false);
      // prepare to restart
      let randomIndex = Math.floor(Math.random() * idList.length);
      preload([idList[randomIndex]], [idList[randomIndex]], [], 0);
    } else {
      // recommendation logic, preload the next name
      preload(previewProposedIds, previewYesLikedNameIds, previewNoLikedNameIds, previewRefus);
    }

    // when there is new liked name, persistend the relation
    let updateIdLike = updatedLikedNames.map((e, i) => { return e.id });
    // console.log("persistend")
    // console.log(updateIdLike)
    axios.post("https://www.monptinom.fr/persist.php", updateIdLike).then((res) => {
      // console.log(res.config.data);
    });
    document.activeElement.blur();
  };

  const preload = (previewProposedIds, previewYesLikedNameIds, previewNoLikedNameIds, previewRefus) => {
    // YES CASE
    // the correlation between proposed names doesn't effect the next most related name
    // so it is safe to preload the "yes" next name without persistence
    maxname(previewProposedIds, previewYesLikedNameIds, true);

    // NO CASE
    if (previewRefus <= 5) {
      maxname(previewProposedIds, previewNoLikedNameIds, false);
    } else if (previewRefus <= 7) {
      choiceno(previewProposedIds, 'top.php', 25, false);
    } else if (previewRefus <= 10) {
      choiceno(previewProposedIds, 'top.php', 100, false);
    } else if (previewRefus <= 15) {
      choiceno(previewProposedIds, 'aleaTop.php', 50, false);
    } else {
      choiceno(previewProposedIds, 'randomname.php', 1, false);
    }
  };

  const maxname = (proposedIds, likedNameIds, isYes) => {
    // console.log("maxname")
    axios
      .get(`https://www.monptinom.fr/max.php`, {
        params: {
          ids: likedNameIds,
          excludes: proposedIds,
          sexe: sexe
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      })
      .then((res) => {
        if (res.data !== undefined && res.data.length > 0) {

          // console.log("maxname return " + res.data[0].nom + " id " + res.data[0].id)
          if (isYes) {
            setNextYesName({ id: res.data[0].id, name: res.data[0].nom })
          } else {
            setNextNoName({ id: res.data[0].id, name: res.data[0].nom })
          }

        }
        else {
          setNextYesName({ id: NaN, name: "Vous avez déjà vu tous les noms !" })
          setNextNoName({ id: NaN, name: "Vous avez déjà vu tous les noms !" })
        }
      });
  };

  const choiceno = (proposedIds, endpoint, size, isYes) => {
    axios
      .get(`https://www.monptinom.fr/${endpoint}`, {
        params: {
          sexe: sexe,
          num: size,
          excludes: proposedIds
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      })
      .then((res) => {
        if (res.data !== undefined && res.data.length > 0) {
          if (isYes) {
            setNextYesName({ id: res.data[0].id, name: res.data[0].nom })
          } else {
            setNextNoName({ id: res.data[0].id, name: res.data[0].nom })
          }
        }
        else {
          setNextYesName({ id: NaN, name: "Vous avez déjà vu tous les noms !" })
          setNextNoName({ id: NaN, name: "Vous avez déjà vu tous les noms !" })
        }
      });
  };


  return (
    <>

      <h1> {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} </h1>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={onChooseYes}
          value="1"
          disabled={!enableChoice}
        >
          Oui <i className="fas fa-heart" style={{ color: "green" }} />
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={onChooseNo}
          value="0"
          disabled={!enableChoice}
        >
          Non <i className="fas fa-times" style={{ color: "red" }} />
        </button>
      </div>

      <div className="phone_view d-flex mt-3">
        <button
          type="button"
          className="btn btn-link btn-sm mr-2 custom2"
          onClick={List}
        >
          Mes choix
        </button>
        <button
          type="button"
          className="btn btn-link btn-sm mr-2 custom2"
          onClick={Reset}
          id="recomBtn"
        >
          Recommencer
        </button>
        <button
          type="button"
          className="btn btn-link btn-sm mr-2 custom2"
          onClick={() => setAide(!aide)}
        >
          Fonctionnement
        </button>
      </div>
    </>
  );
}
