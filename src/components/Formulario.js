import React,{ useState } from 'react'
import Error from './Error';
import { nanoid } from 'nanoid'
import PropTypes  from 'prop-types';

const Formulario = ({guardarGasto,guardarCrearGasto, restante}) => {
    
    const [nombre, guardarNombre] = useState('');
    const [cantidad, guradarCantidad] =useState(0);
    const [error, guardarError] = useState(false)
    
    // Cuando el usuario agrega un gasto
    const agregargastos = e =>{
       
        e.preventDefault();
         
        //validar
        if (cantidad < 1 || isNaN(cantidad) || nombre.trim() === '') {
            guardarError(true);
            return;
        }

        if(cantidad > restante){
            guardarError(true);
            return;
        }
        guardarError(false);
        //construir gasto
        const gasto = {
            nombre,
            cantidad,
            id: nanoid()
        }
       


        //pasar el gasto al componente pincipal
        guardarGasto(gasto)
        guardarCrearGasto(true);
        //resetear el form
        guardarNombre([]);
        guradarCantidad(0);
    }

    return ( 

           <form
                onSubmit={agregargastos}
           >
            {error && cantidad > restante ? <Error mensaje="La cantidad no puede Superar el Restante"/> : error ? <Error mensaje="Ambos campos son Obligatorios o Presupuesto incorrecto"/> : null}
                <h2>Agrega tus Gastos Aqui</h2>
                <div className='campo'>
                    <label>Nombre Gasto</label>
                    <input 
                        type='text'
                        className='u-full-width'
                        placeholder='Ej. Transporte'
                        value={nombre}
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>
                <div className='campo'>
                    <label>Cantidad Gasto</label>
                    <input 
                        type='number'
                        className='u-full-width'
                        placeholder='Ej. 300'
                        value={cantidad}
                        onChange={e => guradarCantidad(parseInt(e.target.value))}
                    />
                </div>
                    <input 
                        type='submit'
                        className='button-primary u-full-width'
                        value='Agregar Gasto'
                    />
           </form> 

     );
}
Formulario.proTypes={
    guardarGasto: PropTypes.func.isRequired, 
    guardarCrearGasto: PropTypes.func.isRequired  
    
  }
export default Formulario;