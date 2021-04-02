import React, { createContext, useState, useMemo } from 'react';
import useTareasApi from '../../Api/useTareasApi';

export const tareaContext = createContext();

const TareaProvider = ({ children }) => {

    const tareasApi = useTareasApi();
    const [isLoading, setIsLoading] = useState(true);
    const [estadoRequest, setEstadoRequest] = useState('');
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

    const eliminarTarea = async (idTarea) => {
        try {
            setEstadoRequest('procesando');
            await tareasApi.delete(`/tareas/${idTarea}`);
            setEstadoRequest('exito');
            setError(null);
            getTareas();
        }
        catch (err) {
            setError('Hubo un error eliminando la tarea');
            setEstadoRequest('');
        }
    }

    const datosContexto = useMemo(() => ({
        isLoading,
        error,
        tareasList,
        estadoRequest,
        
        getTareas,
        eliminarTarea,
    }));

    return (
        <tareaContext.Provider value={datosContexto}>
            {children}
        </tareaContext.Provider>
    );
}

export default TareaProvider;
