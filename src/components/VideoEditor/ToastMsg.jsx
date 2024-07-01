import { Toast, ToastContainer } from "react-bootstrap";

const ToastMsg = ({ showToast, setShowToast, msg }) => {
  return (
    <>
      <ToastContainer
        className="p-3"
        position={"bottom-center"}
        style={{ zIndex: 1 }}
      >
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={2000}
          bg="dark"
          autohide
        >
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Video Editor</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};
export default ToastMsg;
