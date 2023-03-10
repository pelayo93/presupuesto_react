import React, { Fragment, useState } from 'react'
import Error from './Error';
import PropTypes  from 'prop-types';


const Pregunta = ({guardarPresupuesto, guardarRestante, actualizarPregunta}) => {

    //Definir el State
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    const definirPresupuesto = e =>{
        guardarCantidad( parseInt(e.target.value, 10 ))
    }

    // Submit para definir presupuesto

    const agregarPresupuesto = e => {
        e.preventDefault();  
        //validar
        if (cantidad < 1 || isNaN(cantidad)) {

            guardarError(true);
            return;
        }
        //si se pasa la validacion
        guardarError(false);
        guardarPresupuesto(cantidad);
        guardarRestante(cantidad);
        actualizarPregunta(false);
 
    } 

        
    return (  
        <Fragment> 
            <h2>Coloca tu Presupuesto</h2>
            {error ? <Error mensaje="El presupuesto es Incorrecto" /> : null}
                <form
                    onSubmit={agregarPresupuesto}
                >
                     <input 
                        type='number'
                        className='u-full-width'
                        placeholder='Coloca tu presupuesto'
                        onChange={definirPresupuesto}
                     />
                     <input 
                        type='submit'
                        className='u-full-width button-primary'
                        value='Definir Presupuesto'
                     />
                </form>
        </Fragment>
    );
    } 
    Pregunta.proTypes={
        guardarPresupuesto: PropTypes.func.isRequired, 
        guardarRestante: PropTypes.func.isRequired,
        actualizarPregunta: PropTypes.func.isRequired 
        
      }
export default Pregunta;
