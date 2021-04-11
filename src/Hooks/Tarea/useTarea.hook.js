import {
    useQuery,
} from 'react-query';

import useTareasApi from '../../Api/useTareasApi';

export const useTarea = (idTarea) => {
    const tareasApi = useTareasApi();
    return useQuery(['tareas', idTarea], async () => {
        if(!idTarea){ //When refetch (e.g. windows focus)
            return null;
        }
        const { data } = await tareasApi.get(`/tareas/${idTarea}`);
        return data;
    }, {
        enabled:!!idTarea, //ignored when refetch
        retry: 0,
        cacheTime: 10*1000,
        staleTime: 2*60000,
    });
}