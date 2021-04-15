import React, { useEffect, useState } from 'react';

import './Tarea-form.styles.css';

import {
    Form,
    Button,
    Col,
    Alert,
} from 'react-bootstrap';

import { useCrearTarea } from '../../../Hooks/Tarea/useCrearTarea.hook';
import { useActualizarTarea } from '../../../Hooks/Tarea/useActualizarTarea.hook';
import TareaDetalle from '../Tarea-detalle/Tarea-detalle.comp';
import { useTarea } from '../../../Hooks/Tarea/useTarea.hook';

const TareaForm = ({ tarea, operacion }) => {

    const [datosTarea, setDatosTarea] = useState(tarea);
    const { mutate: crearTarea, error } = useCrearTarea();
    const { mutate: actualizarTarea, error: errorActualizar } = useActualizarTarea();

    const [idTarea, setIdTarea] = useState(undefined);
    useTarea(idTarea);

    useEffect(() => {
        setDatosTarea(tarea);
    }, [tarea]);

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
        if (operacion === 'crear') {
            await crearTarea(datosTarea);
            setDatosTarea({
                titulo: '',
                descripcion: '',
                duracion: 0,
                prioridad: 0,
                estado: 'sin-iniciar',
            });
        }
        else if (operacion === 'actualizar') {
            await actualizarTarea(datosTarea);
            setIdTarea(tarea.id); //Actualizar tarea en el estado global
        }
    }

    return (
        <Form onSubmit={onSubmit} className="tarea-form">

            {operacion === 'actualizar'
                ?
                <Form.Group>
                    <TareaDetalle tarea={tarea} />
                </Form.Group>
                : null
            }

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
                Guardar
            </Button>

            {error || errorActualizar && (errorActualizar?.toString() !== 'Missing queryFn')
                ?
                <Form.Group>
                    <br />
                    <Alert variant="danger">
                        {error?.toString()} {errorActualizar?.toString()}
                    </Alert>
                </Form.Group>
                : null
            }
        </Form>
    )
}

export default TareaForm;
