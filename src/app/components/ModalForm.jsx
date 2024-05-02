"use client";
import Offcanvas from "react-bootstrap/Offcanvas";
import MainForm from "./MainForm";
export default function ModalForm({ showModalName, handleModalCloseName, modalHeading, projectName }) {
  return (
    <Offcanvas show={showModalName} placement="bottom" className="canvas-custom popup-form" onHide={handleModalCloseName}>
      <Offcanvas.Header closeButton>
        {modalHeading && <Offcanvas.Title>{modalHeading}</Offcanvas.Title>}
      </Offcanvas.Header>
      <Offcanvas.Body className="canvas-custom__body">
        <MainForm projectName={projectName} />
      </Offcanvas.Body>
    </Offcanvas>
  )
}

