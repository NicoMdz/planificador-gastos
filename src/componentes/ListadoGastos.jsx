import React from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltrados,
}) => {
  return (
    <div className="listado-gastos contenedor">
      <h2>{gastos.length ? "Gastos" : "No hay Gastos aún"}</h2>{" "}
      {/* Si gastos contiene algo entonces... */}
     
     
     

      {gastos.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto} //Pasamos el prop de gasto que se refiere a cada objeto de gasto en el arreglo gastos, el cual estamos iterando
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))}
    </div>
  );
};

export default ListadoGastos