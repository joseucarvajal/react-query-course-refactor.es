import React from 'react';

import './Footer.styles.css';

import {
    Col,
    Row,
    Alert,
} from 'react-bootstrap';

import ContadorTareas from '../../Tarea/Contador-tareas/Contador-tareas.comp';

function Footer() {
    return (
        <footer>
            <Alert variant="secondary">
                <Row>
                    <Col md={{ span: 2, offset: 10 }} className="contador-tareas">
                        <ContadorTareas />
                    </Col>
                </Row>
            </Alert>
        </footer>
    )
}

export default Footer;
