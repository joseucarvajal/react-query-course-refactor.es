import React, { useState, useEffect } from 'react';

import {
    Tabs,
    Tab,
    Spinner,
    Alert,
} from 'react-bootstrap';

import useTareasApi from '../../Api/useTareasApi';

import CrearTarea from './components/Crear-tarea/Crear-tarea.comp';
import ListadoTareas from './components/Listado-tareas/Listado-tareas.comp';

const TareasListPage = () => {

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

    return (
        <Tabs
            defaultActiveKey="listar"
            transition={false}
            onSelect={(tabKey) => {
                if(tabKey === 'listar'){
                    getTareas();
                }
            }}
        >
            <Tab eventKey="listar" title="Listado Tareas">
                {isLoading ?
                    <Spinner animation="border" variant="primary" />
                    : null
                }
                {error ?
                    <Alert variant="danger">
                        {error}
                    </Alert>
                    : null
                }
                <ListadoTareas tareasList={tareasList} />
            </Tab>
            <Tab eventKey="adicionar" title="Agregar nueva tarea">
                <CrearTarea/>
            </Tab>
        </Tabs>
    );
}

export default TareasListPage;
