import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog } from "../../redux/actions";

//se renderiza en la ruta /home/dogName
export default function DetailCard(props) {
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.dog);

  useEffect(() => {
    dispatch(getDog(props.match.params.dogId));
  }, [dispatch, props.match.params.dogId]);

  return (
    <div>
      <h3>Hola!, soy {dog.name}</h3>
    </div>
  );
}
