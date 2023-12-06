import React, { useState } from "react";
import axios from "axios";

const UploadForm = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post(import.meta.env.VITE_API_URL + "/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <img
        src="https://zahab-space.sfo3.digitaloceanspaces.com/images/1687293088306-small.jpg"
        alt="img"
      />
      <input
        type="file"
        formEncType="multipart/form-data"
        onChange={handleFileChange}
      />
      <button className="btn btn-outline-dark" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default UploadForm;
