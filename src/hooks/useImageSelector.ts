import axios from 'axios';
import {useState} from 'react';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import {baseUrl} from '../constants/Env';

const useImageSelector = () => {
  const [imageUri, setImageUri] = useState<string | undefined>();
  const [uploadStatus, setUploadStatus] = useState<boolean>(false);

  const selectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        if (response.assets === undefined) return null;
        const uri = response.assets[0].uri;
        if (!uri) return null;
        uploadImage(uri);
      }
    });
  };

  const uploadImage = async (uri: string) => {
    if (uri) {
      const formData = new FormData();
      formData.append('image', {
        uri: uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      });

      try {
        setUploadStatus(true);
        console.log(baseUrl)
        const response = await axios.post(`${baseUrl}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setImageUri(response.data.data);
      } catch (error: any) {
        console.error('Upload error', error.response.data);
      } finally {
        setUploadStatus(false);
      }
    }
  };
  return {imageUri, uploadStatus, selectImage};
};

export default useImageSelector