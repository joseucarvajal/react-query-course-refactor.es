import { useCallback, useContext } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';
import useTareasApi from '../../Api/useTareasApi';

export const useActualizarTarea = () => {
    
    const tareasApi = useTareasApi();

    const { 
        status,
        setStatus,
        setError,
        error,
        refetch 
    } = useContext(tareaContext);

    const actualizarTarea = useCallback(async (tarea) => {
        try {
            setStatus('loading');
            await tareasApi.put(`/tareas/${tarea.id}`, tarea);
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
        actualizarTarea,
        status,
        refetch,
        error,
    };
}