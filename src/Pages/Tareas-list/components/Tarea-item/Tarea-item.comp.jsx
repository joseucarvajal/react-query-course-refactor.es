import React from 'react'
import {
    ListGroup,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const TareaItem = ({ tarea }) => {
    return (
        <ListGroup.Item variant="light">
             <Link to={`/modificar-tarea/${tarea.id}`}>{tarea.titulo}</Link>
        </ListGroup.Item>
    )
}

export default TareaItem
