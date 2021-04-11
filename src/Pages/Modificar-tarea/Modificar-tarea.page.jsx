import React from 'react';
import { Alert, Spinner } from 'react-bootstrap';

import {
    useParams
} from "react-router-dom";

import TareaForm from '../../components/Tarea/Tarea-form/Tarea-form.comp';
import { useTarea } from '../../Hooks/Tarea/useTarea.hook';

const ModificarTareaPage = () => {

    let { idTarea } = useParams();
    const { status, data:tarea, error } = useTarea(idTarea);

    if (status === 'loading' || !tarea) {
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
        <TareaForm tarea={tarea} operacion='actualizar' />
    );
}

export default ModificarTareaPage;
