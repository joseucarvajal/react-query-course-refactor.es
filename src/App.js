import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
} from "react-router-dom";

import {
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import Menu from './components/app/Menu/Menu.comp';
import PaginaContainer from './components/app/Pagina-container/Pagina-container.comp';
import Footer from './components/app/Footer/Footer.comp';
import TareaProvider from './Providers/Tarea/Tarea.provider';

function App() {
  return (
    <TareaProvider>
      <Router>
        <Container fluid className="app-container">
          <Row>
            <Col xs="3">
              <Menu />
            </Col>
            <Col>
              <PaginaContainer />
            </Col>
          </Row>
          <Footer />
        </Container>
      </Router>
    </TareaProvider>
  );
}

export default App;
