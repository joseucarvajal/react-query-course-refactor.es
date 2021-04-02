import { useContext, useEffect } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';

export const useDatosTarea = () => {

    const { isLoading, error, getTareas, tareasList } = useContext(tareaContext);

    useEffect(() => {
        getTareas();
    }, []);

    return {
        isLoading,
        error,
        getTareas,
        tareasList
    };
}