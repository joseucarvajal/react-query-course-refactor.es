import React from 'react';

import TareasListPage from '../../../Pages/Tareas-list/Tareas-list.page';
import ModificarTareaPage from '../../../Pages/Modificar-tarea/Modificar-tarea.page';
import Home from '../../../Pages/Home/Home.page';

import {
    Switch,
    Route,
  } from "react-router-dom";

const PaginaContainer = () => {
    return (
        <Switch>
        <Route path="/tareas-list">
          <TareasListPage />
        </Route>
        <Route path="/modificar-tarea/:idTarea">
          <ModificarTareaPage />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
}

export default PaginaContainer;