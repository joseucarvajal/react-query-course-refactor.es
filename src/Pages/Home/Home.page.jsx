import React from 'react';
import { Alert } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            Home page
            <br />
            <br />
            <b>v1.5</b>: Búsqueda de tareas por id, mostrar detalle de tarea en vista de modificación
            <Alert variant="danger">
                <b>ERROR</b> re-render al actualizar tarea
            </Alert>
        </div>
    )
}

export default Home;
