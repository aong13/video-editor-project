import React from "react";
import { Modal, Spinner } from "react-bootstrap";

const ProcessingModal = ({ processing, setProcessing }) => {
  return (
    <>
      {/* 변환 처리 중 모달 */}
      <Modal
        show={processing}
        onHide={() => setProcessing(false)}
        backdrop="static"
        keyboard={false}
        centered
        size="sm"
      >
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p
            style={{
              marginTop: 16,
              fontSize: 14,
              fontWeight: 600,
              color: "#c8c8c8",
            }}
          >
            내보내기가 진행중입니다.
          </p>
        </div>
      </Modal>
    </>
  );
};

export default ProcessingModal;
