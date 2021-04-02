import { useContext } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';

export const useEliminarTarea = () => {

    const {estadoRequest, error, eliminarTarea } = useContext(tareaContext);

    return {
        estadoRequest,
        error,
        eliminarTarea,
    };
}