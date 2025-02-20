const fs = require('fs');
const axios = require('axios');
require('dotenv').config()

const upload = async (name,image,folder,filetype) => {
    try {
        const api = process.env.Upload_To_S3;
        
        if (!image || !name) {
            return res.status(400).json({
                message: 'Missing image or username in the request body.',
            });
        }

        const fileExtension = image.split('.').pop().toLowerCase();
        const ContentType = fileExtension === 'jpeg' || fileExtension === 'jpg' ? 'image/jpg' : 'image/png';

        const imageBuffer = fs.readFileSync(image);
        const base64Image = imageBuffer.toString('base64');

        const payload = {
            name: name,
            image: base64Image,
            ContentType: ContentType,
            folder: folder
        };

        console.log('Sending request to Lambda with payload:', JSON.stringify(payload));

        const response = await axios.post(api, payload, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Lambda response:', response.data);
        return response.data.location

    } catch (err) {
        console.error('Error uploading image:', err);

        if (err.response) {
            console.error('Axios error response:', err.response.data);
            return
        }
    }
};
module.exports = upload;
