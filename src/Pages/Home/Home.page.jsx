import React from 'react';
import { Alert } from 'react-bootstrap';

const Home = () => {
    return (
        <div>
            Home page
            <br />
            <br />
            <b>v1.7</b>: Migrar queries y mutations a React-Query
            <Alert variant="danger">
                <b>BUG #4</b> No se actualizan contadores al actualizar estado de una tarea
            </Alert>
        </div>
    )
}

export default Home;
