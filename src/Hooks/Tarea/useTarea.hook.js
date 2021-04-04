import { useCallback, useContext, useEffect, useState } from 'react';
import { tareaContext } from '../../Providers/Tarea/Tarea.provider';
import useTareasApi from '../../Api/useTareasApi';

export const useTarea = (idTarea) => {

    const [tarea, setTarea] = useState();

    const tareasApi = useTareasApi();

    const {
        status,
        setStatus,
        setError,
        error,
    } = useContext(tareaContext);

    const refetch = useCallback(async () => {

        if(!idTarea){
            return;
        }

        try {
            setStatus('loading');
            const { data } = await tareasApi.get(`/tareas/${idTarea}`);
            setTarea(data);
            setStatus('success');
            setError(null);
        }
        catch (err) {
            setStatus('idle');
        }
        finally{

        }
    }, [idTarea]);

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