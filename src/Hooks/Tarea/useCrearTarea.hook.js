import { useCallback, useContext } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';
import useTareasApi from '../../Api/useTareasApi';

export const useCrearTarea = () => {
    
    const tareasApi = useTareasApi();

    const { 
        status,
        setStatus,
        setError,
        error,
        refetch 
    } = useContext(tareaContext);

    const crearTarea = useCallback(async (tarea) => {
        try {
            setStatus('loading');
            await tareasApi.post(`/tareas`, tarea);
            setStatus('success');
            setError(null);
        }
        catch (err) {
            setStatus('error');
            setError('Hubo un error creando la tarea');
            console.error(err);
        }
    });

    return {
        crearTarea,
        status,
        refetch,
        error,
    };
}