import React from 'react';

import './Tarea-item.styles.css';

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
    const { status, eliminarTarea, refetch } = useEliminarTarea();

    return (
        <ListGroup.Item variant="light">
            <Row>
                <Col md={{ span: 11 }} className="vertical-center">
                    <Link to={`/modificar-tarea/${tarea.id}`}>{tarea.titulo}</Link>
                </Col>
                <Col>
                    {status === 'loading'
                        ? <Spinner animation="border" variant="primary" />
                        : null
                    }
                    {status !== 'loading'
                        ?
                        <Button
                            variant="danger"
                            className="btn-eliminar"
                            onClick={async () => {
                                await eliminarTarea(tarea.id);
                                refetch();
                            }}
                        >
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
