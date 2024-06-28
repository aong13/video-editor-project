import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-3">
      <Container>
        <table style={{ backgroundColor: "transparent", color: "white" }}>
          <tbody>
            <tr>
              <td>
                <strong>Tel. </strong>
              </td>
              <td>02-2023-2024</td>
            </tr>
            <tr>
              <td>
                <strong>Email </strong>
              </td>
              <td>aong13@gmail.com</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3">
          © {new Date().getFullYear()} My Company. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
