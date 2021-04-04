import React from 'react';

import './Tarea-detalle.styles.css';

import {
    Alert,
} from 'react-bootstrap';

const TareaDetalle = ({ tarea }) => {

    if(!tarea){
        return null;
    }
    return (
        <Alert variant="success">
            <b>{tarea.id}</b> - <u>{tarea.titulo}</u>
        </Alert>
    )
}

export default TareaDetalle;
