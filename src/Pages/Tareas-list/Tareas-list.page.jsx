import React from 'react';

import {
    Tabs,
    Tab,
    Spinner,
    Alert,
} from 'react-bootstrap';

import { useDatosTarea } from '../../Hooks/Tarea/useDatosTarea.hook';

import CrearTarea from './components/Crear-tarea/Crear-tarea.comp';
import ListadoTareas from './components/Listado-tareas/Listado-tareas.comp';

const TareasListPage = () => {

    const { isLoading, error, tareasList, getTareas } = useDatosTarea();

    return (
        <Tabs
            defaultActiveKey="listar"
            transition={false}
            onSelect={(tabKey) => {
                if (tabKey === 'listar') {
                    getTareas();
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
                <ListadoTareas 
                    tareasList={tareasList} 
                    onTareaEliminada={()=>{
                        getTareas();
                    }}
                />
            </Tab>
            <Tab eventKey="adicionar" title="Agregar nueva tarea">
                <CrearTarea />
            </Tab>
        </Tabs>
    );
}

export default TareasListPage;
