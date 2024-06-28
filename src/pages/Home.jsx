import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };
  return (
    <Container>
      <div>홈화면</div>
    </Container>
  );
};

export default Home;
