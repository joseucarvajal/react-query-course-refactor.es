import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useCrearTarea = () => {
    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();
    return useMutation(tarea => tareasApi.post(`/tareas`, tarea), {
        onSuccess: () => {
            queryClient.refetchQueries('tareas');
        },
    });
}