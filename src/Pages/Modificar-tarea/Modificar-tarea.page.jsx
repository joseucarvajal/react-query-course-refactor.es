import React, { useEffect, useState } from 'react';
import { Alert, Spinner } from 'react-bootstrap';

import {
    useParams
} from "react-router-dom";

import TareaForm from '../../components/Tarea/Tarea-form/Tarea-form.comp';
import useTareasApi from '../../Api/useTareasApi';

const ModificarTareaPage = () => {

    let { idTarea } = useParams();

    const tareasApi = useTareasApi();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const [tarea, setTarea] = useState({});

    useEffect(()=>{
        const getTareaById = async () => {
            try {
                setIsLoading(true);
                const { data } = await tareasApi.get(`/tareas/${idTarea}`);
                setTarea(data);
            }
            catch (err) {
                setError('Hubo un error cargado la tarea');
            }
            finally {
                setIsLoading(false);
            }
        }

        getTareaById();
    }, [idTarea]);

    if (isLoading) {
        return <Spinner animation="border" variant="primary" />
    }
    if (error) {
        return (
            <Alert variant="danger">
                {error}
            </Alert>
        );
    }

    return (
        <TareaForm tarea={tarea} operacion='modificar' />
    )
}

export default ModificarTareaPage;
