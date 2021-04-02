import React from 'react';
import {
    Card,
    ListGroup,
} from 'react-bootstrap';

import TareaItem from '../Tarea-item/Tarea-item.comp';

const ListadoTareas = ({tareasList, onTareaEliminada}) => {

    if(!tareasList || tareasList.length === 0){
        return null;
    }

    return (
        <Card>
            <Card.Header>Tareas disponibles</Card.Header>
            <ListGroup variant="flush">
                {tareasList.map((tarea) =>
                    <TareaItem
                        key={tarea.id}
                        tarea={tarea}
                        onTareaEliminada={onTareaEliminada}
                    />
                )}
            </ListGroup>
        </Card>
    );
}

export default ListadoTareas;
