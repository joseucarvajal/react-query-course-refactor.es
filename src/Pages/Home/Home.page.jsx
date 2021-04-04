import React from 'react';
import { Alert } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            Home page
            <br />
            <br />
            <b>v1.5.1</b>: Solución a BUG #1  de refresco de datos de la tarea en modo modificación
            <Alert variant="danger">
                <b>BUG #2</b> No se actualizan los contadores de tareas debido a que se deshabilitó el refetch.
            </Alert>
        </div>
    )
}

export default Home;
