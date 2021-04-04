import { useContext, useCallback } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';
import useTareasApi from '../../Api/useTareasApi';

export const useEliminarTarea = () => {

    const tareasApi = useTareasApi();

    const { 
        status,
        setStatus,
        setError,
        error,
        refetch 
    } = useContext(tareaContext);

    const eliminarTarea = useCallback(async (idTarea) => {
        try {
            setStatus('loading');
            await tareasApi.delete(`/tareas/${idTarea}`);
            setStatus('success');
            setError(null);
        }
        catch (err) {
            setStatus('error');
            setError('Hubo un error actualizando la tarea');
            console.error(err);
        }
    });

    return {
        eliminarTarea,
        status,
        refetch,
        error,
    };

}