import React, { useState } from "react";
import QrReader from "react-qr-scanner"
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      onScan(data); 
      navigate(data); // Handle scanned data
    }
  };

  const handleError = (err) => {
    setError(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default QRCodeScanner;
