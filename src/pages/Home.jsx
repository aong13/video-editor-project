import { Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const onNavigate = (path) => {
    navigate(path);
  };
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} className="text-center">
          <h1>BootStrap, Antd 실습</h1>
          <div className="d-flex justify-content-around mt-4">
            <Button
              variant="primary"
              onClick={() => onNavigate("/cms")}
              style={{ width: "150px" }}
            >
              CMS
            </Button>
            <Button
              variant="secondary"
              onClick={() => onNavigate("/video")}
              style={{ width: "150px" }}
            >
              Video
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
