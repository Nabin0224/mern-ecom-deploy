import { useState } from "react";
import { QrReader } from "react-qr-reader"; // Correct import
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Adjust to use onResult instead of onScan
  const handleScanResult = (result) => {
    if (result) {
      console.log("Scanned Data:", result);
      onScan(result); // Handle scanned data
      navigate(result); // Redirect to scanned URL
    }
  };

  const handleError = (err) => {
    console.error("QR Scanner Error:", err); // Log error
    setError(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={handleScanResult} // Use onResult here
        style={{ width: "100%" }}
        constraints={{
          facingMode: "environment", // Use back camera
        }}
      />
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default QRCodeScanner;
