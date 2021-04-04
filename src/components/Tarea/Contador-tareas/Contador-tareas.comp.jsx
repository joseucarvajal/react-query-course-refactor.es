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
        const contadorTareas = data?.reduce(
            (acum, tarea) => acum + (tarea.estado !== 'terminada' ? 1 : 0), 0
        );

        return (
            <Button variant="warning" block>
                <Badge variant="light">{contadorTareas}</Badge> Tareas pendientes
            </Button>
        );
    }

    return (
        <Button variant="primary" block>
            <Badge variant="light">{data?.length}</Badge> Tareas
        </Button>
    );
}

export default ContadorTareas;