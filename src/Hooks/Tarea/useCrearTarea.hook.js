import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useCrearTarea = () => {
    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();
    return useMutation(tarea => tareasApi.post(`/tareas`, tarea), {
        onMutate: async nuevaTarea => {
            await queryClient.cancelQueries('tareas');
            const tareasListAnterior = queryClient.getQueryData('tareas');
            queryClient.setQueryData('tareas', prevList => [...prevList, nuevaTarea]);
            return { tareasListAnterior }
        },
        onError: (error, nuevaTarea, context) => {
            queryClient.setQueryData('tareas', context.tareasListAnterior);
        },
        onSettled: () => {
            queryClient.invalidateQueries('tareas');
        },
        retry: 0,
    });
}