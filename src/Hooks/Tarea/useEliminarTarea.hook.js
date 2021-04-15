import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useEliminarTarea = () => {
    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();
    return useMutation(
        idTarea => tareasApi.delete(`/tareas/${idTarea}`),
        {
            onMutate: async tareaId => {
                await queryClient.cancelQueries('tareas');

                queryClient.setQueryData(['tareas', tareaId], null);

                const tareasListAnterior = queryClient.getQueryData('tareas');

                queryClient.setQueryData('tareas', prevList => {
                    const indexToRemove = prevList.findIndex(t => t.id === tareaId);
                    return [...prevList.slice(0, indexToRemove), ...prevList.slice(indexToRemove + 1)];
                });
                
               return { tareasListAnterior }
            },
            onError: (error, idTareaEliminada, context) => {
                queryClient.setQueryData('tareas', context.tareasListAnterior);
            },
            onSettled: () => {
                queryClient.invalidateQueries('tareas');
            },
            retry: 0,
        }
    );
}