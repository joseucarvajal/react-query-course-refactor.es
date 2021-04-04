import { useContext, useEffect } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';

export const useDatosTarea = () => {

    const { status, error, refetch, data } = useContext(tareaContext);

    useEffect(() => {
        refetch();
    }, []);

    return {
        status,
        error,
        refetch,
        data
    };
}