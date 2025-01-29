import axios from 'axios';
import { downloadFile } from 'helper/DownloadIntercepter';

export const downloadVideo = async json_data => {
  try {
    const responseData = await axios.post(`/download`, { json_data }, { responseType: 'blob' });
    // comment -> add validation
    downloadFile(responseData, 'video.mp4');
  } catch (error) {
    console.log('error', error);
  }
};
