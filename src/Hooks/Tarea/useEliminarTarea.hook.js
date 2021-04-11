import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useEliminarTarea = () => {
    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();
    return useMutation(
        idTarea => tareasApi.delete(`/tareas/${idTarea}`),
        {
            onSuccess: (response, idTareaEliminada) => {
                queryClient.refetchQueries('tareas');
            },
        }
    );
}