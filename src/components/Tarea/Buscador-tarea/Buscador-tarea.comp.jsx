import React, { useState } from 'react';

import './Buscador-tarea.styles.css';

import {
    Form,
    Spinner,
    InputGroup,
    Col,
    Card,
    Alert,
} from 'react-bootstrap';

import { Search } from 'react-bootstrap-icons';

import { Link } from 'react-router-dom';

import { useTarea } from '../../../Hooks/Tarea/useTarea.hook';

const BuscadorTarea = () => {

    const [tareaId, setTareaId] = useState();
    const { status, tarea } = useTarea(tareaId);

    const onTareaChange = async (event) => {
        setTareaId(event.target.value.trim());
    }

    return (
        <Card>
            <Card.Body>
                <Form>
                    {
                        status === 'loading'
                            ?
                            <Form.Group>
                                <Spinner animation="border" size="md" variant="primary" />
                            </Form.Group>
                            : null
                    }

                    <Form.Row>
                        <Form.Group as={Col} className="buscar">
                            <InputGroup>
                                <Form.Control
                                    name="titulo"
                                    placeholder="Id tarea"
                                    onChange={onTareaChange}
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text>
                                        <Search />
                                    </InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    {
                        tarea && status === 'success'
                            ?
                            <Form.Row>
                                <Alert variant="success">
                                    <Link to={`/modificar-tarea/${tarea.id}`}>
                                        {tarea.titulo}
                                    </Link>
                                </Alert>
                            </Form.Row>
                            : null
                    }

                </Form>
            </Card.Body>
        </Card>
    )
}

export default BuscadorTarea;
