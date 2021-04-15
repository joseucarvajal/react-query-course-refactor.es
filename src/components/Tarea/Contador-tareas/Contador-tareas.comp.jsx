import React from 'react';

import {
    Spinner,
    Alert,
    Button,
    Badge,
} from 'react-bootstrap';

import { useDatosTarea } from '../../../Hooks/Tarea/useDatosTarea.hook';

function ContadorTareas({ soloTareasPendientes }) {

    const {status, error, data} = useDatosTarea();

    if (status === 'loading') {
        return <Spinner animation="border" variant="primary" />
    }
    if (error) {
        return (
            <Alert variant="danger">
                error
            </Alert>
        );
    }

    if (soloTareasPendientes) {
        return (
            <Button variant="warning" block>
                <Badge variant="light">{data.tareasPendientes}</Badge> Tareas pendientes
            </Button>
        );
    }
    
    return (
        <Button variant="primary" block>
            <Badge variant="light">{data?.tareasList?.length}</Badge> Tareas
        </Button>
    );
}

export default ContadorTareas;