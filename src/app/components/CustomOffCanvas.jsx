"use client";
import Offcanvas from "react-bootstrap/Offcanvas";
export default function CustomOffCanvas({ showModalName, handleModalCloseName, modalHeading, children }) {
  return (
    <Offcanvas show={showModalName} placement="bottom" className="canvas-custom" onHide={handleModalCloseName}>
      <Offcanvas.Header closeButton>
        {modalHeading && <Offcanvas.Title>{modalHeading}</Offcanvas.Title>}
      </Offcanvas.Header>
      <Offcanvas.Body className="canvas-custom__body">
        {children}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
