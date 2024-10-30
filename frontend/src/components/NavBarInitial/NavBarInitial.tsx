import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './NavBarInitial.css';
import { Link } from 'react-router-dom';
function NavBarInitialComponent() {
  return (
    <Navbar expand="lg" className="NavBarInitial" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)'}}>
      <Container>
        <Navbar.Brand href="/" style={{ color:'white'}}>Observatorio de Egressos UFC - Quixadá</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto mx-lg-5" style={{paddingLeft:'50rem'}}>
            <Link to="/login" className="nav-link" style={{ color:'white'}}>Login</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarInitialComponent;