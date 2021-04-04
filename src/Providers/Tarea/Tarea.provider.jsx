import React, 
{ 
    createContext, 
    useState, 
    useMemo, 
    useRef
} from 'react';

import useTareasApi from '../../Api/useTareasApi';

export const tareaContext = createContext();

const TareaProvider = ({ children }) => {

    const tareasApi = useTareasApi();
    const [status, setStatus] = useState('idle');
    const [error, setError] = useState('');

    //Listado de tareas
    const [data, setData] = useState([]);
    
    const promesaActivaRef = useRef(false)

    const refetch = async () => {
        if (!promesaActivaRef.current) {
            promesaActivaRef.current = (async () => {
                try {
                    setStatus('loading');
                    const { data } = await tareasApi.get("/tareas");
                    setData(data);
                    setStatus('success');
                    setError(null);
                }
                catch (err) {
                    setStatus('error');
                    setError('Hubo un error cargando las tareas');
                    setData([]);
                }
                finally {
                    promesaActivaRef.current = false;
                }
            })();
        }

        return promesaActivaRef.current;
    }

    const eliminarTarea = async (idTarea) => {
        try {
            setStatus('loading');
            await tareasApi.delete(`/tareas/${idTarea}`);
            setStatus('success');
            setError(null);
            refetch();
        }
        catch (err) {
            setError('Hubo un error eliminando la tarea');
            setStatus('error');
        }
    }

    const actualizarTarea = async (tarea) => {
        try {
            setStatus('loading');
            await tareasApi.put(`/tareas/${tarea.id}`, tarea);
            setStatus('success');
            setError(null);
            refetch();
        }
        catch (err) {
            setStatus('error');
            setError('Hubo un error actualizando la tarea');
            setStatus('');
        }
    }

    const datosContexto = useMemo(() => ({
        error,
        setError,
        data,
        status,
        setStatus,

        refetch,
        eliminarTarea,
        actualizarTarea,
    }));

    return (
        <tareaContext.Provider value={datosContexto}>
            {children}
        </tareaContext.Provider>
    );
}

export default TareaProvider;
