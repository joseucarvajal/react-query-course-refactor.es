import React from 'react';
import { Alert } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            Home page
            <br />
            <br />
            <b>v1.5.2</b>: Solución a BUG #2  de refresco de contadores
            <Alert variant="danger">
                <b>BUG #3</b> BUG #3 : No se actualizan los datos del título en el componente de "modificar tarea" ni del buscador de tareas
            </Alert>
        </div>
    )
}

export default Home;
