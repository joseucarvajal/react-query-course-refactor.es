import { useState } from 'react';

import useTareasApi from '../../Api/useTareasApi';

export const useEliminarTarea = () => {

    const tareasApi = useTareasApi();
    const [estadoEliminar, setEstadoEliminar] = useState('');
    const [error, setError] = useState('');

    const eliminarTarea = async (idTarea) => {
        try {
            setEstadoEliminar('procesando');
            await tareasApi.delete(`/tareas/${idTarea}`);
            setEstadoEliminar('exito');
            setError(null);
        }
        catch (err) {
            setError('Hubo un error eliminando la tarea');
            setEstadoEliminar('');
        }
    }

    return {
        estadoEliminar,
        error,
        eliminarTarea,
    };
}