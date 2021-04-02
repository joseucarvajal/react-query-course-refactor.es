import React from 'react';

import './Menu.styles.css';

import {
    Nav,
    Navbar,
    NavDropdown
} from 'react-bootstrap';

import {
    Link
} from "react-router-dom";

import ContadorTareas from '../../Tarea/Contador-tareas/Contador-tareas.comp';

const Menu = () => {
    return (
        <Navbar bg="light" expand="xs" className="flex-column">
            <Navbar.Brand>Tareas App</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/tareas-list">Tareas</Nav.Link>
                <NavDropdown.Divider />
            </Nav>
            <ContadorTareas
                soloTareasPendientes={true}
            />
        </Navbar>
    )
}

export default Menu
