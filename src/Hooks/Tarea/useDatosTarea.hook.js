import {
    useQuery,
    useQueryClient,
} from 'react-query';

import useTareasApi from '../../Api/useTareasApi';

export const useDatosTarea = () => {

    const queryClient = useQueryClient();
    const tareasApi = useTareasApi();

    return useQuery('tareas', async () => {
        const { data } = await tareasApi.get(`/tareas`);
        return data;
    },
        {
            select: (tareasList) => {
                const contadorTareas = tareasList?.reduce(
                    (acum, tarea) => 
                        acum + (tarea.estado !== 'terminada' ? 1 : 0),
                    0
                );
                return {
                    tareasList,
                    tareasPendientes: contadorTareas,
                };
            },
            onSuccess: (data) => {
                data.tareasList.forEach(tarea =>
                    queryClient.setQueryData(['tareas', tarea.id], tarea)
                );
            },
            cacheTime: 10 * 60 * 1000,
            staleTime: 6*1000,
            retry: 0,
        }
    );
}