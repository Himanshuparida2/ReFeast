const axios = require("axios");
require("dotenv").config();

// Accepts buffer directly from multer memoryStorage
// No more fs.readFileSync needed — buffer is already in memory
const upload = async (name, fileBuffer, folder, mimetype, originalname) => {
  try {
    const api = process.env.Upload_To_S3;

    if (!fileBuffer || !name) {
      return null;
    }

    // Derive ContentType from mimetype (passed from multer)
    // Fallback: derive from original filename extension
    const ContentType = mimetype || (() => {
      const ext = originalname.split(".").pop().toLowerCase();
      return ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
    })();

    // Convert buffer to base64 — same as before but no disk read needed
    const base64Image = fileBuffer.toString("base64");

    const payload = {
      name: name,
      image: base64Image,
      ContentType: ContentType,
      folder: folder,
    };

    console.log("Sending request to Lambda:", { name, folder, ContentType });

    const response = await axios.post(api, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Lambda response:", response.data);
    return response.data.location;

  } catch (err) {
    console.error("Error uploading image:", err);
    if (err.response) {
      console.error("Lambda error response:", err.response.data);
    }
    return null;
  }
};

module.exports = upload;