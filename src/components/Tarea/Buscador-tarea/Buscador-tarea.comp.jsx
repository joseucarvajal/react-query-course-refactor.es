import React, { useEffect, useState } from 'react';

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
    const { status, data: tarea, isError } = useTarea(tareaId);

    const onTareaChange = async (event) => {
        setTareaId(event.target.value.trim());
    }
    
    /*
    useEffect(()=>{
        if(isError){
            setTareaId('');
        }
    }, [isError]);
    */
   
    return (
        <Card>
            <Card.Body>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col} className="buscar">
                            <InputGroup>
                                <Form.Control
                                    value={tareaId}
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
                        status === 'loading' && tareaId
                            ?
                            <Form.Group>
                                <Spinner animation="border" size="md" variant="primary" />
                            </Form.Group>
                            : null
                    }
                    {
                        tareaId && tarea && status === 'success'
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
                    {
                        isError
                            ?
                            <Form.Row>
                                <Col>
                                    <Alert variant="warning">
                                        Tarea no encontrada
                                </Alert>
                                </Col>
                            </Form.Row>
                            : null
                    }

                </Form>
            </Card.Body>
        </Card>
    )
}

export default BuscadorTarea;
