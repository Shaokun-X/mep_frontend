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
  liked_names,
  idLike,
  setidLike,
  iteration,
  setIteration,
  refus,
  setRefus,
  setLikedNames,
  id,
  setId,
  idList,
  setidList,
  LikeLink,
  setLikeLink
}) {
  // Reset all parameters
  const Reset = () => {
    setSexe("NA");
    setLikedNames([]);
    setName(null);
    setId(null);
    setidLike([]);
    setidList([]);
    setRefus(0);
    setIteration(0);
    setLikeLink([]);
  };

  //Get list of names
  const List = () => {
    if (liked_names.length === 0)
      alert("Formez avant votre liste de prénoms !");
    else setList(!list);
  };

  const handleChange = (event) => {
    if (iteration < 10) {
      if (event.target.value === "1") {
        setIteration(iteration + 1);
        maxname();
      }

      if (event.target.value === "0") {
        setLikeLink([]);
        if (refus <= 5) {
          randomname();
          setRefus(refus + 1);
        }
        if (refus === 6) {
          top100();
          setRefus(refus + 1);
        }
        if (refus === 7) {
          top25();
          setRefus(0);
        }
      }
    }

    if (iteration === 10) {
      if (event.target.value === 1) {
        aleaTop50();
        setIteration(0);
      }

      if (event.target.value === 0) {
        setLikeLink([]);
        aleaTop50();
      }
    }

    const idUP = idList.concat(id);
    setidList(idUP);

    if (event.target.value === "1" && !idLike.includes(id)) {

      const NewList = liked_names.concat({ name: name, id: id });
      setLikedNames(NewList);

      const IdlikeUP = idLike.concat(id);
      setidLike(IdlikeUP);

      const LikeLinkUP = LikeLink.concat(id);
      setLikeLink(LikeLinkUP);

      axios.post("http://monptinom.fr/persist.php", IdlikeUP).then((res) => {
        console.log(res.config.data);
      });
    }
  };

  const maxname = () => {
    axios
      .get(`http://monptinom.fr/max.php`, {
        params: {
          id: LikeLink.length === 0  ? id : LikeLink,
        },
        paramsSerializer: function (params) {
          return qs.stringify(params, { arrayFormat: "repeat" });
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if ( res.data !== undefined &&  res.data.length > 0 ) {
            var i = 0;
            while (  i < res.data.length - 1 && idList.includes(res.data[i].id) ) {
              i++;
            }
            if (res.data[i].id &&  !(idList.includes(res.data[i].id)) ) {
              setName(res.data[i].nom);
              setId(res.data[i].id);
            } else {
              randomname();
            }
        }
        else {
          randomname();
        }
      });
  };

  const top100 = () => {
    axios
      .get(`http://monptinom.fr/top100.php`, {
        params: {
          sexe: sexe,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then((res) => {
        if ( res.data !== undefined &&  res.data.length > 0 ) {
            var i = 0;
            while (  i < res.data.length - 1 && idList.includes(res.data[i].id) ) {
              i++;
            }
            if (res.data[i].id &&  !(idList.includes(res.data[i].id)) ) {
              setName(res.data[i].nom);
              setId(res.data[i].id);
            } else {
              randomname();
            }
        }
        else {
          randomname();
        }
      });
  };
  const top25 = () => {
    axios
      .get(`http://monptinom.fr/top25.php`, {
        params: {
          sexe: sexe,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if ( res.data !== undefined &&  res.data.length > 0 ) {
            var i = 0;
            while (  i < res.data.length - 1 && idList.includes(res.data[i].id) ) {
              i++;
            }
            if (res.data[i].id &&  !(idList.includes(res.data[i].id)) ) {
              setName(res.data[i].nom);
              setId(res.data[i].id);
            } else {
              randomname();
            }
        }
        else {
          randomname();
        }
      });
  };
  const aleaTop50 = () => {
    axios
      .get(`http://monptinom.fr/aleaTop50.php`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        if ( res.data !== undefined &&  res.data.length > 0 ) {
            var i = 0;
            while (  i < res.data.length - 1 && idList.includes(res.data[i].id) ) {
              i++;
            }
            if (res.data[i].id &&  !(idList.includes(res.data[i].id)) ) {
              setName(res.data[i].nom);
              setId(res.data[i].id);
            } else {
              randomname();
            }
        }
        else {
          randomname();
        }
      });
  };

  const randomname = () => {
    axios
      .get(`http://monptinom.fr/index.php`, {
        params: {
          sexe: sexe,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then((res) => {
        var i = 0;
        while (i < res.data.length - 1 && idList.includes(res.data[i].id)) {
          if (res.data[i + 1]) {
            i++;
          } 
        }
        setName(res.data[i].nom);
        setId(res.data[i].id);
      });
  };

  const firstname = () => {
    axios
      .get(`http://monptinom.fr/index.php`, {
        params: {
          sexe: sexe,
        },
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then((res) => {
        setName(res.data[0].nom);
        setId(res.data[0].id);
      });
  };




  return (
    <>
      {name ? (
        <h1> {name.charAt(0).toUpperCase() + name.slice(1)} </h1>
      ) : (
        firstname()
      )}
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={handleChange}
          value="1"
        >
          Oui <i className="fas fa-heart" style={{ color: "green" }} />
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2 custom"
          onClick={handleChange}
          value="0"
        >
          Non <i className="fas fa-times" style={{ color: "red" }} />
        </button>
      </div>

      <div className="phone_view">
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
