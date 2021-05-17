import React from "react";

export default function SexChoice({ setSexe, initialNames, setName, setId, setNextYesName, setNextNoName}) {
  //set the baby's name
  const handleChange = (event) => {
    setSexe(event.target.value);
    if (event.target.value === 'm') {
      setName(initialNames.boy.name);
      setId(initialNames.boy.id)
      setNextYesName(initialNames.nextBoyY);
      setNextNoName(initialNames.nextBoyN);
    } else {
      setName(initialNames.girl.name);
      setId(initialNames.girl.id)
      setNextYesName(initialNames.nextGirlY);
      setNextNoName(initialNames.nextGirlN);
    }
  };

  return (
    <>
      <p className="slogan mt-4 mb-5 px-2">
        « Découvrez les tendances des utilisateurs qui ont les mêmes préférences que vous »
      </p>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2  custom"
          onClick={handleChange}
          value="m"
        >
          Garçon
        </button>
        <button
          type="button"
          className="btn btn-outline-success btn-lg mr-2  custom"
          onClick={handleChange}
          value="f"
        >
          Fille
        </button>
      </div>
    </>
  );
}
