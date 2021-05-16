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
  iter,
  setIter,
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
  setInitialNames
}) {
  // Reset all parameters
  const Reset = () => {
    // prepare to restart, load the very first names
    initial();

    setSexe("NA");
    setLikedNames([]);
    // name and id would set at sex choose stage
    setName("");
    setId(null);
    setidList([]);
    setRefus(0);
    setIter(0);
    setEnableChoice(true);
  };

  // change to list name component
  const List = () => {
    if (likedNames.length === 0)
      alert("Formez avant votre liste de prénoms !");
    else setList(!list);
  };

  const onChooseNo = () => {

    // update of states is asyncronous, so we store them locally then pass them to API request methods
    const likedIds = likedNames.map((e, i) => { return e.id });
    const proposedIds = idList.concat(id);
    const updatedRefus = refus + 1;
    // if iter is greater than 0, means that there are liked names
    const updatedIter = (iter > 0) ? iter + 1 : 0;
    setidList(proposedIds);

    // replace display name with preloaded next name
    setName(nextNoName.name);
    setId(nextNoName.id);
    setRefus(refus + 1);

    // if the id of next name is NaN, that means all names in DB has been viewed
    if (isNaN(nextYesName.id) || isNaN(nextNoName.id)) {
      setEnableChoice(false);
    } else {
      // recommendation logic, preload the next name
      preload(proposedIds, likedIds, nextNoName.id, updatedRefus, updatedIter);
    }
    document.activeElement.blur();
  };

  const onChooseYes = () => {
    if (id !== nextYesName.id) {
      // update of states is asyncronous, so we store them locally then pass them to API request methods
      const updatedLikedNames = likedNames.concat({ name: name, id: id });
      const updatedLikedIds = updatedLikedNames.map((e, i) => { return e.id });
      const updatedIter = iter + 1;
      const proposedIds = idList.concat(id);
      setLikedNames(updatedLikedNames);
      setidList(proposedIds);

      // replace display name with preloaded next name
      setName(nextYesName.name);
      setId(nextYesName.id);
      setIter(iter + 1);

      // if the id of next name is NaN, that means all names in DB have been viewed
      if (isNaN(nextYesName.id) || isNaN(nextNoName.id)) {
        setEnableChoice(false);
      } else {
        // recommendation logic, preload the next name
        preload(proposedIds, updatedLikedIds, nextYesName.id, refus, updatedIter);
      }

      // when there is new liked name, persistend the relation
      axios.post("https://www.monptinom.fr/persist.php", updatedLikedIds).then((res) => {
        console.log(res.config.data);
      });
    }
    document.activeElement.blur();
  };

  const preload = (proposedIds, likedIds, currentId, refu, iter) => {
    axios
      .get(`https://www.monptinom.fr/preload.php`, {
        params: {
          like: likedIds,
          prop: proposedIds,
          sex: sexe,
          refu: refu,
          iter: iter,
          curr: currentId
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "brackets" });
        },
      })
      .then((res) => {
        if (res.data === undefined) {
          setNextYesName({ id: NaN, name: "Vous avez déjà vu tous les noms !" });
          setNextNoName({ id: NaN, name: "Vous avez déjà vu tous les noms !" });
        } else {
          if (res.data.Y !== undefined) {
            setNextYesName({ id: res.data.Y.id, name: res.data.Y.nom });
          } else {
            setNextYesName({ id: NaN, name: "Vous avez déjà vu tous les noms !" });
          }
          if (res.data.N !== undefined) {
            setNextNoName({ id: res.data.N.id, name: res.data.N.nom });
          } else {
            setNextNoName({ id: NaN, name: "Vous avez déjà vu tous les noms !" });
          }
        }
      });
  };

  const initial = () => {
    axios
      .get(`https://www.monptinom.fr/index.php`)
      .then((res) => {
        let data = res.data;
        let initialNames = {};
        initialNames.boy = { id: data[0].id, name: data[0].nom };
        initialNames.nextBoyY = { id: data[1].id, name: data[1].nom };
        initialNames.nextBoyN = { id: data[2].id, name: data[2].nom };
        initialNames.girl = { id: data[3].id, name: data[3].nom };
        initialNames.nextGirlY = { id: data[4].id, name: data[4].nom };
        initialNames.nextGirlN = { id: data[5].id, name: data[5].nom };
        setInitialNames(initialNames);
      });
  }

  return (
    <>

      <h1 className="text-center"> {name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()} </h1>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={onChooseYes}
          disabled={!enableChoice}
        >
          Oui <i className="fas fa-heart" style={{ color: "green" }} />
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={onChooseNo}
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
