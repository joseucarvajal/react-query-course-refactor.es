import { useMutation, useQueryClient } from 'react-query';
import useTareasApi from '../../Api/useTareasApi';

export const useActualizarTarea = () => {

    const tareasApi = useTareasApi();
    const queryClient = useQueryClient();

    return useMutation(
        tarea => tareasApi.put(`/tareas/${tarea.id}`, tarea),
        {
            onMutate: async tareaAACtualizar => {
                await queryClient.cancelQueries('tareas');
                const tareaAnterior = queryClient.getQueryData(['tareas', tareaAACtualizar.id]);
                queryClient.setQueryData(['tareas', tareaAACtualizar.id], tareaAACtualizar);
                
                const tareasListAnterior = queryClient.getQueryData('tareas');
                queryClient.setQueryData('tareas', prevList => {
                    const nuevaLista = prevList.map((tarea)=>{
                        if(tarea.id === tareaAACtualizar.id){
                            return tareaAACtualizar;
                        }
                        return tarea;
                    });

                    return nuevaLista;
                });

                return { tareaAnterior, tareasListAnterior }
            },
            onSuccess: (response, tarea) => {
                queryClient.setQueryData(['tareas', tarea.id], tarea);
                queryClient.refetchQueries('tareas');
            },
            onError: (error, tareaModificada, context) => {
                queryClient.setQueryData(['tareas', context.tareaAnterior.id], context.tareaAnterior);
                queryClient.setQueryData('tareas', context.tareasListAnterior);
            },
            retry: 0,
        });
}