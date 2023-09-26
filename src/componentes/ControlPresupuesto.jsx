import React from 'react'
import { useState,useEffect } from 'react'
import {CircularProgressbar, buildStyles} from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ({gastos, presupuesto}) => {
    
    const [porcentaje,setPorcentaje] = useState(0)//State para la gráfica
    const [disponible,setDisponible] = useState(0)
    const [gastado,setGastado] = useState(0)

    //useEffect para calculos. Escucha los cambios que suceden en gastos
    useEffect( () => {  //Va a ir acumulando gasto.cantidad en total y sumando constantemente el total acumulado, inicia en 0
       const totalGastado = gastos.reduce( (total,gasto) => gasto.cantidad + total, 0);
       const totalDisponible = presupuesto - totalGastado

        //Calcular el porcentaje gastado
        const nuevoPorcentaje = (
            ((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2) //tofixed para que sean dos digitos 

       setDisponible(totalDisponible)
       setGastado(totalGastado)
       setTimeout(() => {
        setPorcentaje(nuevoPorcentaje) //Dentro de timeout simplemente para que se logre ver la animación en lo que se cierra el modal
       }, 700);
    },[gastos])// Cada que gastos cambie
    
    //Función que convierte un número a un formato de tipo moneda
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar
                styles={buildStyles({
                    pathColor: "#3B82F6",
                    trailColor: "#ebebeb",
                    textColor: "#3B82F6",
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            />
        </div>
        <div className='contenido-presupuesto'>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto