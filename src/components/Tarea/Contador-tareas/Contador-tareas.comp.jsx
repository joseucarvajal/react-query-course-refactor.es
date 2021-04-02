import React, { useState, useEffect } from 'react';

import {
    Spinner,
    Alert,
    Button,
    Badge,
} from 'react-bootstrap';

import useTareasApi from '../../../Api/useTareasApi';

function ContadorTareas({ soloTareasPendientes }) {

    const tareasApi = useTareasApi();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [tareasList, setTareasList] = useState([]);

    const getTareas = async () => {
        try {
            setIsLoading(true);
            const { data } = await tareasApi.get("/tareas");
            setTareasList(data);
            setError(null);
        }
        catch (err) {
            setError('Hubo un error cargando las tareas');
            setTareasList([]);
        }
        finally {
            setIsLoading(false);
        }
    }
    
    useEffect(() => {
        getTareas();
    }, []);

    if (isLoading) {
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
        const contadorTareas = tareasList.reduce(
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
            <Badge variant="light">{tareasList?.length}</Badge> Tareas
        </Button>
    );
}

export default ContadorTareas;