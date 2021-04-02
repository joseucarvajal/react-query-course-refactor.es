import { useEffect, useState } from 'react';

import useTareasApi from '../../Api/useTareasApi';

export const useDatosTarea = () => {

    const tareasApi = useTareasApi();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [tareasList, setTareasList] = useState([]);

    const getTareas = async () => {
        try {
            setIsLoading(true);
            const { data } = await tareasApi.get("/tareas");
            setTareasList(data);
            setError(null);
        }
        catch (err) {
            setError('Hubo un error cargando las tareas');
            setTareasList([]);
        }
        finally {
            setIsLoading(false);
        }
    }

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