cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
})
    console.log('Cloudinary connected');

export const uploadImage = async (req, res) => {
    try {
        const image = req.file;
        const user = req.user; // Assuming authentication middleware sets req.user
        const { name, description } = req.body;

        if (!image) {
            return res.status(400).json({ message: "File upload failed. No file provided." });
        }

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(image.path, {
            folder: 'uploads',
        });

        // Save the image details to the database
        const newImage = await UploadModel.create({
            image: result.secure_url, // Use Cloudinary secure URL
        });

        return res.status(201).json({ message: "Image uploaded successfully.", data: newImage });
    } catch (error) {
        console.error("Error uploading image:", error.message); // Log error safely
        return res.status(500).json({ message: "Server error.", error: error.message });
    }
};
