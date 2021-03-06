import React, { useState } from 'react';

import './Tarea-form-simple.styles.css';

import {
    Form,
    Button,
    Alert,
} from 'react-bootstrap';

import { useCrearTarea } from '../../../Hooks/Tarea/useCrearTarea.hook';

const TareaFormSimple = ({ tarea }) => {

    const { mutate: crearTarea, status, error } = useCrearTarea();
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
    }

    return (
        <Form onSubmit={onSubmit} className="tarea-form">
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
                Guardar
            </Button>
            
            <br />
            {status === 'error'
                ?
                <Form.Group>
                    <Alert variant="danger">
                        {error?.toString()}
                    </Alert>
                </Form.Group>
                : null
            }
        </Form>
    )
}

export default TareaFormSimple;
