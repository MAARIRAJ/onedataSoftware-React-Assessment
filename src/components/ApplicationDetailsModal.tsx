import React, { useRef } from "react";
import { Modal, Button, Badge } from "react-bootstrap";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Application } from "../types/Application";

interface ApplicationDetailsModalProps {
  show: boolean;
  onHide: () => void;
  application: Application;
}

export default function ApplicationDetailsModal({
  show,
  onHide,
  application,
}: ApplicationDetailsModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    const input = printRef.current;
    if (!input) return;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("application.pdf");
    });
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <div ref={printRef} className="p-3">
        <Modal.Header closeButton>
          <Modal.Title>Application Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Name:</strong> {application.firstName}{" "}
            {application.lastName}
          </p>
          <p>
            <strong>Email:</strong> {application.email}
          </p>
          <p>
            <strong>Skills:</strong>{" "}
            {application.skills.map((s, i) => (
              <Badge key={i} bg="info" className="me-1">
                {s.label}
              </Badge>
            ))}
          </p>
          <p>
            <strong>About Me:</strong>
          </p>
          <div
            dangerouslySetInnerHTML={{ __html: application.aboutMeHTML || "" }}
          />
        </Modal.Body>
      </div>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={downloadPDF}>
          Download PDF
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
