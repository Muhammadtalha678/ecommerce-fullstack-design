export const extractPublicId = (url) => {
  const parts = url.split('/');
//   console.log("parts",parts);
  
  const fileWithExtension = parts[parts.length - 1]; // e.g. abc123.jpg
//   console.log("fileWithExtension",fileWithExtension);
  const publicId = fileWithExtension.substring(0, fileWithExtension.lastIndexOf('.'));
//   console.log("publicId",publicId);
  const folder = parts[parts.length - 2]; // e.g. 'ecommerce-internship'
//   console.log("folder",folder);
//   console.log("${folder}/${publicId}",folder/publicId);
  return `${folder}/${publicId}`;
};