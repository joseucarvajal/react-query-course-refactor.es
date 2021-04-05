import { useCallback, useEffect, useContext } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';

export const useTarea = (idTarea) => {

    const { hashTareas, refetchById } = useContext(tareaContext);

    const { data: tarea, status, error } = hashTareas[idTarea] || { status: 'idle' };

    const refetch = useCallback(
        async () => refetchById(idTarea),
        [idTarea]
    );

    useEffect(() => {
        refetch();
    }, [refetch]);

    return {
        status,
        refetch,
        error,
        tarea,
    };
}