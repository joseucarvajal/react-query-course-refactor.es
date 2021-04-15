import {
    useQuery,
} from 'react-query';

import useTareasApi from '../../Api/useTareasApi';

export const useTarea = (idTarea) => {
    const tareasApi = useTareasApi();
    return useQuery(idTarea && ['tareas', idTarea], async () => {
        const { data } = await tareasApi.get(`/tareas/${idTarea}`);
        return data;
    }, {
        enabled:!!idTarea, //ignored when refetch
        //retry: 0,
        staleTime: 2*60000,
    });
}