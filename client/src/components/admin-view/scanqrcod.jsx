import { useState } from "react";
import { QrReader } from "react-qr-reader"; // Correct import
import { useNavigate } from "react-router-dom";

const QRCodeScanner = ({ onScan }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScanResult = (result) => {
    if (result && result.text) {  
      console.log("Scanned Data:", result.text);  // Log the URL to the console
      const scannedURL = result.text;

      // Check if the scanned URL is valid
      if (scannedURL && scannedURL.startsWith("http://localhost:5173")) {
        console.log("Navigating to: ", scannedURL);  // Log before navigating
        window.location.href = scannedURL // Navigate to the scanned URL
      } else {
        console.error("Invalid URL detected", scannedURL);
      }
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
