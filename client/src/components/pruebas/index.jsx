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
      <select>
        <optgroup label="WEIGHT">
          <option value="all">todos!</option>
          <option value="min">los más livianos</option>
          <option value="max">los más pesados</option>
        </optgroup>
      </select>
    </div>
  );
}

export default Prueba;
