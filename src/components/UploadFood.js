import React, { useState } from "react";

const UploadItem = () => {
  const [username, setUsername] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemStatus, setItemStatus] = useState("");
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("ItemName", itemName);
      formData.append("ItemDescription", itemDescription);
      formData.append("ItemStatus", itemStatus);

      images.forEach((img) => {
        formData.append("ItemImages", img);
      });

      const res = await fetch("http://localhost:5050/add-item", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Upload Item</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Item Name"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Description"
        value={itemDescription}
        onChange={(e) => setItemDescription(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Status"
        value={itemStatus}
        onChange={(e) => setItemStatus(e.target.value)}
      />
      <br /><br />

      <input type="file" multiple onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadItem;