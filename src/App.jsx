import { useState, useEffect } from 'react'
import Header from './componentes/Header'
import Filtros from './componentes/Filtros';
import ListadoGastos from './componentes/ListadoGastos';
import Modal from './componentes/Modal';
import { generarID } from './helpers';
import IconoNuevoGasto from "./img/nuevo-gasto.svg"

function App() {
  
  //state que registrará un arreglo con los multiples objetos de gastos
  const [gastos,setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
    )//Primero comprobamos que exista gastos en LS, si exsiste, inicia el state con lo que hay en LS pero como es string lo convertimos a arreglo con parse, sino, inicialo como un arreglo vacío

  const [presupuesto,setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) ?? 0
  );
  const [isValidPresupuesto,setIsValidPresupuesto] = useState(false)

  const [modal,setModal] = useState(false)
  const [animarModal,setanimarModal] = useState(false)
  //state que identifica el objeto gasto que está siendo editado
  const [gastoEditar,setGastoEditar] = useState({})

  const [filtro,setFiltro] = useState("")
  const [gastosFiltrados,setGastosFiltrados] = useState([])
  //useEffect que escuchara por los cambios en gastoEditar
  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      setModal(true)
  
      setTimeout(() => {
        setanimarModal(true)
      }, 500)
    }
  }, [gastoEditar])
  //useEffect para LS del presupuesto
  useEffect(() => {
    localStorage.setItem("presupuesto", presupuesto ?? 0)
  }, [presupuesto])
  //useEffect para LS de los gastos
  useEffect(() => {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? []) //Escucha si hay algo en gastos y en su caso, añade gastos al item gastos pero como es arreglo y LS solo acepta strings, lo pasamos a string con stringify, si no hay nada, arreglo vacío
  },[gastos])
  //useEffect que escucha cuando haya algo en filtro
  useEffect(() => {
    if(filtro) {
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)//Nos retorna el arreglo gastos filtrado con la categoria que seleccionamos en el filtro
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])
  //useEffect que seteara el presupuesto como valido si hay algo mayor a 0 en LS
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if(presupuestoLS > 0) {
      setIsValidPresupuesto(true)//para que nos mantenga en el mismo panel sin regresar a la pantalla principal
    }
  })
  
  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({}) //Reiniciamos le state del gastoeditar al momento de hacer un nuevo gasto

    setTimeout(() => {
      setanimarModal(true)
    }, 500)
  }
  //funcion que guarda un objeto de gasto dentro del arreglos gastos
  //se hace una copia del arreglo vacio original y se le añada el nuevo
  const guardarGasto = gasto => { 
    if(gasto.id) {
      //Actualizar
      const gastosActualizados = gastos.map( gastoState => gastoState.id ===
        gasto.id ? gasto : gastoState)
        setGastos(gastosActualizados)
        setGastoEditar({})
    }else{
      //NuevoGasto
      gasto.id = generarID(); //Generamos el ID desde aquí y no desde Modal.jsx, mejores practicas
      gasto.fecha = Date.now(); //Para añadir la fecha de registro del gasto
      setGastos([...gastos,gasto])
    }
    //Para que al guardar el gasto, se cierre el modal con la animación
    setanimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }
  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id );
    setGastos(gastosActualizados)
  }

  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
     { isValidPresupuesto && ( //Ternario mas corto en el que no regresamos nada en caso de falso, aqui solo decimos que cuando sea true, despliegue el boton para añadir un nuevo gasto
      <>
        <main>
          <Filtros
            filtro={filtro}
            setFiltro={setFiltro}
          />
          <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
          />
        </main>
        <div className='nuevo-gasto'>
            <img
             src={IconoNuevoGasto} 
             alt="Ícono nuevo gasto"
             onClick={handleNuevoGasto} />
        </div>
      </>
     )} 

     {modal && <Modal 
                setModal={setModal} 
                animarModal={animarModal} 
                setanimarModal={setanimarModal}
                guardarGasto={guardarGasto}
                gastoEditar={gastoEditar}
                setGastoEditar={setGastoEditar}
                />}
    </div>
  )
}

export default App
