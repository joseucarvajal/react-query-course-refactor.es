import React, { useState } from 'react';

import './Tarea-form-simple.styles.css';

import {
    Form,
    Button,
    Spinner,
    Alert,
} from 'react-bootstrap';

import { useCrearTarea } from '../../../Hooks/Tarea/useCrearTarea.hook';

const TareaFormSimple = ({ tarea }) => {

    const { crearTarea, status, error, refetch } = useCrearTarea();
    const [datosTarea, setDatosTarea] = useState(tarea);

    const onCampoChange = (event) => {
        setDatosTarea(
            {
                ...datosTarea,
                [event.target.name]: event.target.value
            }
        );
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        await crearTarea(datosTarea);
        setDatosTarea({
            titulo: '',
            descripcion: '',
            duracion: 0,
            prioridad: 0,
            estado: 'sin-iniciar',
        });
        refetch();
    }

    return (
        <Form onSubmit={onSubmit} className="tarea-form">
            <Form.Group>
                {status === 'loading'
                    ? <Spinner animation="border" size="md" variant="primary" />
                    : null
                }
            </Form.Group>

            <Form.Group>
                <Form.Control
                    name="titulo"
                    value={datosTarea.titulo}
                    onChange={onCampoChange}
                    placeholder="Título"
                />
            </Form.Group>

            <Form.Group>
                <Form.Control
                    as="textarea"
                    rows={2}
                    name="descripcion"
                    value={datosTarea.descripcion}
                    onChange={onCampoChange}
                    placeholder="Descripción"
                />
            </Form.Group>

            <Button
                variant="primary"
                type="submit"
                className="btn-guardar"
            >
                {status === 'loading' ?
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
                    : null
                }
                    Guardar
            </Button>


            <br />
            {status === 'error'
                ?
                <Form.Group>
                    <Alert variant="danger">
                        {error}
                    </Alert>
                </Form.Group>
                : null
            }
        </Form>
    )
}

export default TareaFormSimple;
