export const extractPublicId = (url) => {
  if (!url || typeof url !== 'string') return '';

  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/').filter(Boolean); // Remove empty parts

    // Find index of 'upload' to handle versions (e.g., /image/upload/v1234567890/)
    const uploadIndex = pathParts.findIndex((part) => part === 'upload');
    if (uploadIndex === -1) {
      console.error('Invalid Cloudinary URL: No "upload" segment found', url);
      return '';
    }

    // Extract folder and file parts after 'upload' (and optional version)
    const folderPathParts = pathParts.slice(uploadIndex + 2); // Skip 'upload' and version
    const fileWithExt = folderPathParts.pop(); // Last part is the file (e.g., abc123.jpg)
    if (!fileWithExt) {
      console.error('Invalid Cloudinary URL: No file name found', url);
      return '';
    }

    // Remove extension to get public ID
    const publicId = fileWithExt.substring(0, fileWithExt.lastIndexOf('.')) || fileWithExt;
    const folder = folderPathParts.join('/'); // Join folder parts (e.g., ecommerce-internship)

    return folder ? `${folder}/${publicId}` : publicId;
  } catch (err) {
    console.error('Failed to extract publicId from URL:', url, err);
    return '';
  }
};