import React, { useEffect } from 'react';
import {
    Col,
    ListGroup,
    Row,
    Button,
    Spinner,
} from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';

import { useEliminarTarea } from '../../../../Hooks/Tarea/useEliminarTarea.hook';

const TareaItem = ({ tarea, onTareaEliminada }) => {
    const { estadoEliminar, eliminarTarea } = useEliminarTarea();

    useEffect(() => {
        if (estadoEliminar === 'exito') {
            onTareaEliminada();
        }
    }, [estadoEliminar]);
    
    return (
        <ListGroup.Item variant="light">
            <Row>
                <Col md={{ span: 11 }}>
                    <Link to={`/modificar-tarea/${tarea.id}`}>{tarea.titulo}</Link>
                </Col>
                <Col>
                    {estadoEliminar === 'procesando'
                        ? <Spinner animation="border" variant="primary" />
                        : null
                    }
                    {estadoEliminar !== 'procesando'
                        ?
                        <Button variant="danger" onClick={() => {
                            eliminarTarea(tarea.id);
                        }}>
                            <Trash />
                        </Button>
                        : null
                    }

                </Col>
            </Row>
        </ListGroup.Item>
    )
}

export default TareaItem;
