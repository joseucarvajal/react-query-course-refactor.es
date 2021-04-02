import React, { useState } from 'react';

import './Tarea-form.styles.css';

import {
    Form,
    Button,
    Col,
    Spinner,
    Alert,
} from 'react-bootstrap';

import useTareasApi from '../../../Api/useTareasApi';

const TareaForm = ({tarea, operacion}) => {

    const [datosTarea, setDatosTarea] = useState(tarea);

    const tareasApi = useTareasApi();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const onCampoChange = (event) => {
        setDatosTarea(
            {
                ...datosTarea,
                [event.target.name]: event.target.value
            }
        );
    }

    const onSubmit = async (event) => {
        try {
            event.preventDefault();
            setError(null);
            setIsLoading(true);

            if(operacion === 'crear'){
                await tareasApi.post("/tareas", datosTarea);
                setDatosTarea({
                    titulo:'',
                    descripcion:'',
                    duracion: 0,
                    prioridad: 0,
                    estado: 'sin-iniciar',
                });
            }
            else if(operacion === 'modificar'){
                await tareasApi.put(`/tareas/${tarea.id}`, datosTarea);
            }
        }
        catch (err) {
            setError('Hubo un error al guardar la tarea');
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <Form onSubmit={onSubmit} className="tarea-form">
            <Form.Group>
                {isLoading ? <Spinner animation="border" size="md" variant="primary" /> : null}
            </Form.Group>

            <Form.Group>
                <Form.Label>Título</Form.Label>
                <Form.Control
                    name="titulo"
                    value={datosTarea.titulo}
                    onChange={onCampoChange}
                    placeholder="Título"
                />
            </Form.Group>

            <Form.Group>
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={datosTarea.descripcion}
                    onChange={onCampoChange}
                    placeholder="Descripción"
                />
            </Form.Group>

            <Form.Row>
                <Col>
                    <Form.Label>Duración</Form.Label>
                    <Form.Control
                        name="duracion"
                        value={datosTarea.duracion}
                        onChange={onCampoChange}
                        placeholder="Duración"
                        type="number"
                    />
                </Col>
                <Col>
                    <Form.Label>Prioridad</Form.Label>
                    <Form.Control
                        name="prioridad"
                        value={datosTarea.prioridad}
                        onChange={onCampoChange}
                        placeholder="Prioridad"
                        type="number"
                    />
                </Col>
                <Col>
                    <Form.Label>Estado</Form.Label>
                    <Form.Control
                        as="select"
                        name="estado"
                        value={datosTarea.estado}
                        onChange={onCampoChange}
                    >
                        <option value="sin-iniciar">Sin iniciar</option>
                        <option value="iniciada">Iniciada</option>
                        <option value="cancelada">Cancelada</option>
                        <option value="terminada">Terminada</option>
                    </Form.Control>
                </Col>
            </Form.Row>

            <Button variant="primary" type="submit">
                {isLoading ?
                    <>
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        {' '}
                    </>
                    : null}
                    Guardar
            </Button>

            <Form.Group>
                <br/>
                {error ?
                    <Alert variant="danger">
                        {error}
                    </Alert>
                    : null
                }
            </Form.Group>

        </Form>
    )
}

export default TareaForm;
