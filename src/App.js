import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools'

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

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
