import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useActualizarTarea = () => {  
    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();
    return useMutation(
        tarea =>  tareasApi.put(`/tareas/${tarea.id}`, tarea),
    {
        onSuccess: (response, tarea)=>{
            queryClient.setQueryData(['tareas', tarea.id], tarea);
            queryClient.refetchQueries('tareas');
        },
    });
}