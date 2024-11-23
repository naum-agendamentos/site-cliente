import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CloudinaryUploader = ({ file, onUploadComplete }) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const uploadImage = async () => {
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'fdl9l3yj'); // Substitua pelo seu upload preset

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dmgfyyioo/image/upload', formData);
        setUrl(response.data.secure_url); // Obtém a URL segura da imagem
        console.log()

        if (onUploadComplete) {
          onUploadComplete(response.data.secure_url); // Notifica o componente pai
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

    uploadImage();
  }, [file]);

  return url ? <>{url}</> : null; // Renderiza a URL ou nada
};

export default CloudinaryUploader;
