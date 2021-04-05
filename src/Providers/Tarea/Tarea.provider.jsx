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

    //Hash de tareas
    const [hashTareas, setHashEstadoTareas] = useState({});

    const promesaTareaActivaRef = useRef({});

    const almacenarTarea = (idTarea, datosTarea) => {
        setHashEstadoTareas((anteriorHashTareas) => ({
            ...anteriorHashTareas,
            [idTarea]: datosTarea
        }));
    };

    const refetchById = async (idTarea) => {

        if(!idTarea){
            return;
        }

        if (!promesaTareaActivaRef.current[idTarea]) {
            promesaTareaActivaRef.current[idTarea] = (async () => {
                try {
                    almacenarTarea(
                        idTarea,
                        {
                            ...setHashEstadoTareas[idTarea],
                            status: 'loading'
                        }
                    );

                    const { data } = await tareasApi.get(`/tareas/${idTarea}`);

                    almacenarTarea(
                        idTarea,
                        {
                            ...setHashEstadoTareas[idTarea],
                            status: 'success',
                            error: '',
                            data: data
                        }
                    );
                }
                catch (err) {
                    almacenarTarea(
                        idTarea,
                        {
                            ...setHashEstadoTareas[idTarea],
                            status: 'error',
                            error: 'error al almacenar la tarea',
                        }
                    );
                }
                finally {
                    promesaTareaActivaRef.current[idTarea] = false;
                }
            })();
        }

        return promesaTareaActivaRef.current[idTarea];
    }

    const datosContexto = useMemo(() => ({
        error,
        setError,
        data,
        status,
        setStatus,
        hashTareas,

        refetch,
        refetchById,
    }));

    return (
        <tareaContext.Provider value={datosContexto}>
            {children}
        </tareaContext.Provider>
    );
}

export default TareaProvider;
