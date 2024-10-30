import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./NavbarComponent.css";
import { logout } from "../../services/logout";
function NavbarComponent() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
      <Navbar.Brand
        className="brand"
        style={{ color: "white", marginRight: "100px" }}
        href="/"
      >
        Observatorio de Egressos UFC - Quixadá
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/" className="navbar-link" style={{ color: "white" }}>
            Dashboard
          </Nav.Link>
          <Nav.Link
            href="/adicionar-survey"
            className="navbar-link"
            style={{ color: "white" }}
          >
            Adicionar e enviar survey
          </Nav.Link>
          <Nav.Link
            href="/adicionar-lista-egressos"
            className="navbar-link"
            style={{ color: "white" }}
          >
            Adicionar Egressos
          </Nav.Link>
          <Nav.Link
            href="/historico-surveys"
            className="navbar-link"
            style={{ color: "white" }}
          >
            Histórico de surveys enviados
          </Nav.Link>

          <NavDropdown
            title="Mais"
            id="basic-nav-dropdown"
            className="custom-dropdown"
          >
            <NavDropdown.Item href="/adicionar-um-novo-egresso">
              Adicionar um novo egresso
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => logout()}>Sair</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
