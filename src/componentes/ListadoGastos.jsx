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
    {/* //Si hay algo un filtro, iteramos y mostramos de acuerdo a ese filtro, si no, mostramos todos los gastos sin filtro */}
     {filtro ? (
        <>
        <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoría"}</h2>{" "}
            {gastosFiltrados.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto} //Pasamos el prop de gasto que se refiere a cada objeto de gasto en el arreglo gastos, el cual estamos iterando
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
        </>
      ) : (
        <>
         <h2>{gastos.length ? "Gastos" : "Aún no hay gastos"}</h2>{" "}
            {gastos.map((gasto) => (
              <Gasto
                key={gasto.id}
                gasto={gasto} //Pasamos el prop de gasto que se refiere a cada objeto de gasto en el arreglo gastos, el cual estamos iterando
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
              />
            ))}
        </>
      )
     }
    </div>
  );
};

export default ListadoGastos