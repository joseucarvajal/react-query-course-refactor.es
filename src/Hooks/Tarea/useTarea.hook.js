import {
    useQuery,
} from 'react-query';

import useTareasApi from '../../Api/useTareasApi';

export const useTarea = (idTarea) => {
    
    const tareasApi = useTareasApi();
    return useQuery(['tareas', idTarea], async () => {
        if(idTarea == null){
            return;
        }
        const { data } = await tareasApi.get(`/tareas/${idTarea}`);
        return data;
    }, {
        enabled:!!idTarea, //ignored when refetch
        cacheTime: 10 * 60 * 1000,
        staleTime: 6*1000,
        retry: 0,
    });
}