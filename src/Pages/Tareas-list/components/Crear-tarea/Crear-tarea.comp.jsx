import React from 'react';

import TareaForm from '../../../../components/Tarea/Tarea-form/Tarea-form.comp';

const CrearTarea = () => {
    return (
        <TareaForm
            tarea={{
                estado: 'sin-iniciar',
                duracion: 0,
                prioridad: 0,
            }}
            operacion='crear'
        />
    )
}

export default CrearTarea;
