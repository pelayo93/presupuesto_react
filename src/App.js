import React, { useState, useEffect} from 'react' 
import './App.css';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';



function App() {

  const [ presupuesto, guardarPresupuesto] = useState(0);
  const [ restante, guardarRestante] = useState(0);
  const [mostrarpregunta, actualizarPregunta] = useState(true);
  const  [ gastos, guardarGastos ] = useState([]);
  const [gasto, guardarGasto]= useState({});
  const [creargasto, guardarCrearGasto] =useState(false);

  // Use Effect que actualiza el restante

  useEffect(() => {
    if(creargasto){
      // agrega el nuevo presupuesto
      guardarGastos([
        ...gastos,
        gasto
     ])
     //Resta del presupuesto Actual
     const presupuestoRestante = restante - gasto.cantidad;
     guardarRestante(presupuestoRestante)
     // Resetear a False
     guardarCrearGasto(false);
    } 
  }, [gasto, creargasto, gastos, restante]);

  //cuando agregemos un nuevo gasto


  return (
    <div className='container'>
      <header>
        <h1>Gasto Semanal</h1>
        <div className='contenido contenido-principal'>
          {mostrarpregunta ? 
          ( 
          <Pregunta 
            guardarPresupuesto={guardarPresupuesto}
            guardarRestante={guardarRestante}
            actualizarPregunta={actualizarPregunta}
          />
        ) : 
            (
               <div className='row'>
              <div className='one-half column'>
                <Formulario 
                  guardarGasto={guardarGasto}
                  guardarCrearGasto={guardarCrearGasto}
                  restante={restante}
                />
              </div>
              <div className='one-half column'>
                  <Listado
                    gastos={gastos}

                  />
                  <ControlPresupuesto
                    presupuesto={presupuesto}
                    restante={restante}
                  />
              </div>
          </div>
            )
       
        }
        </div>
        
      </header>
    </div>
   
  );
}

export default App;
