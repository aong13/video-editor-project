import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <Navbar
      expand="lg"
      style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.05)", height: "80px" }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/edit-video">
          <img src={logo} alt="로고이미지" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/edit-video">
              비디오 편집
            </Nav.Link>
            <Nav.Link as={Link} to="/merge-video">
              비디오 병합
            </Nav.Link>
            <Nav.Link as={Link} to="login">
              로그인
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
