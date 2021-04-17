import {
    useQuery,
} from 'react-query';

import useTareasApi from '../../Api/useTareasApi';

export const useDatosTarea = () => {
    const tareasApi = useTareasApi();
    return useQuery('tareas', async () => {
        const { data } = await tareasApi.get(`/tareas`);
        return data;
    }, {
        refetchOnWindowFocus: true,
    });
}