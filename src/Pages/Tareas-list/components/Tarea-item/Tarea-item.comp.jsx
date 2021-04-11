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

const TareaItem = ({ tarea }) => {
    const { status, mutate:eliminarTarea } = useEliminarTarea();

    return (
        <ListGroup.Item variant="light" className="item-tarea">
            <Row>
                <Col md={{ span: 11 }} className="vertical-centered">
                    <Row>
                        <Col >
                            <Link to={`/modificar-tarea/${tarea.id}`} style={{ display: 'inline' }}>{tarea.titulo}</Link>
                        </Col>
                        <Col xs={2} >
                            {tarea.id}
                        </Col>
                    </Row>
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
