import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ product_id }) => {
  const [file, setFile] = useState(null);

  // get product id from props
  // console.log("product_id for upload component", product_id);

  const handleMultipleFileChange = (event) => {
    const files = event.target.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setFile(formData);
    console.log("set file", formData);
  };

  const handleMultipleUpload = async () => {
    // const formData = new FormData();
    // formData.append("file", file);
    try {
      // Assuming 'file' is a FormData object containing the files to be uploaded
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/uploadmultiple/" + product_id,
        file,
        { timeout: 20000 }
      );

      // Handle the response from the server
      console.log("Files uploaded successfully:", response.data);

      // Continue with any additional logic after the upload is completed
      // ...
    } catch (error) {
      // Handle any errors that occur during file upload
      console.error("Error uploading files from server:", error);
    }
  };

  const Delete = async () => {
    try {
      await axios.delete(import.meta.env.VITE_API_URL + "/deletefile", {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          filename: "1687293088306-small.jpg",
        },
      });
      console.log("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  return (
    <div>
      {/* <img
        src="https://zahab-space.sfo3.digitaloceanspaces.com/images/1687293088306-small.jpg"
        alt="img"
      />
      <button onClick={Delete}>Delete</button> */}
      <input
        type="file"
        formEncType="multipart/form-data"
        multiple
        onChange={handleMultipleFileChange}
      />
      <button onClick={handleMultipleUpload}>Upload</button>
    </div>
  );
};

export default UploadForm;
