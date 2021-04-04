import React from 'react';

import {
    Tabs,
    Tab,
    Spinner,
    Alert,
} from 'react-bootstrap';

import TareaFormSimple from '../../components/Tarea/Tarea-form-simple/Tarea-form-simple.comp';

import { useDatosTarea } from '../../Hooks/Tarea/useDatosTarea.hook';

import CrearTarea from './components/Crear-tarea/Crear-tarea.comp';
import ListadoTareas from './components/Listado-tareas/Listado-tareas.comp';

const TareasListPage = () => {

    const { isLoading, error, data, refetch } = useDatosTarea();

    return (
        <Tabs
            defaultActiveKey="listar"
            transition={false}
            onSelect={(tabKey) => {
                if (tabKey === 'listar') {
                    refetch();
                }
            }}
        >
            <Tab eventKey="listar" title="Listado Tareas">
                {isLoading
                    ? <Spinner animation="border" variant="primary" />
                    : null
                }
                {error
                    ? <Alert variant="danger">
                        {error}
                    </Alert>
                    : null
                }
                <ListadoTareas tareasList={data} />
                <TareaFormSimple
                    tarea={{
                        estado: 'sin-iniciar',
                        duracion: 0,
                        prioridad: 0,
                    }}
                    operacion='crear'
                />
            </Tab>
            <Tab eventKey="adicionar" title="Agregar nueva tarea">
                <CrearTarea />
            </Tab>
        </Tabs>
    );
}

export default TareasListPage;
