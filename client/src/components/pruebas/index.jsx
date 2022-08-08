import React, { useState } from "react";

function Prueba() {
  const [isCheck, setCheck] = useState(false);

  const handleOnChange = () => {
    setCheck(!isCheck);
  };

  return (
    <div>
      Select your pizza topping:
      <div>
        <input
          type="checkbox"
          name="topping"
          value="Paneer"
          checked={isCheck}
          onChange={(e) => handleOnChange(e)}
        />
        <p>Paneer</p>
        <div>
          <h2>El estado es: {isCheck === false ? " false" : " true"}</h2>
        </div>
      </div>
    </div>
  );
}

export default Prueba;
