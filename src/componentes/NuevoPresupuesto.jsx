import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({
  presupuesto,
  setPresupuesto,
  setIsValidPresupuesto,
}) => {
  const [mensaje, setMensaje] = useState("");
  //Manejando el envío y validando el presupuesto ingresado
  const handlePresupuesto = (e) => {
    e.preventDefault();

    if (!presupuesto || presupuesto < 0) {
      //Para convertir mi state a numero y validar
      setMensaje("No es un presupuesto válido");
      return; //para que no se ejecute lo de abajo y el if termine justo aquí. Solo estamos validando un presupuesto inválido
    }
    setMensaje(""); //reseteamos el state para que al corregir el presupuesti invalido ya no aparezca la alerta
    setIsValidPresupuesto(true);
  };
  //Formulario
  return (
    <div className="contenedor-presupuesto contenedor sombra">
      <form onSubmit={handlePresupuesto} className="formulario">
        <div className="campo">
          <label>Definir Presupuesto</label>

          <input
            className="nuevo-presupuesto"
            type="number"
            placeholder="Añade tu Presupuesto"
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))} //Convertimos a número para facilidad de cálculos
          />
        </div>

        <input type="submit" value="Añadir" />
        {/* Recordar que mensaje se llena con el valor al ingresar un presupuesto no válido.*/}
        {/* setMensaje solo se está llenando y pasando un valor a mensaje cuando el presupeusto es inválido*/}
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
      </form>
    </div>
  );
};

export default NuevoPresupuesto