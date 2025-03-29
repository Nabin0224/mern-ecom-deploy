import { useState } from "react";
import {QrReader} from "react-qr-reader"; // Use this instead of react-qr-scanner
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    console.log("Scanned Data:", data);
    if (data) {
      onScan(data);
      navigate(data);
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err);
    setError(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        constraints={{ facingMode: "environment" }} // Back camera
      />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default QRCodeScanner;
