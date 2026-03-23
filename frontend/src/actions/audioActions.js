import axios from "axios";
import {
  AUDIO_UPLOAD_REQUEST,
  AUDIO_UPLOAD_SUCCESS,
  AUDIO_UPLOAD_FAIL,
  AUDIO_LIST_REQUEST,
  AUDIO_LIST_SUCCESS,
  AUDIO_LIST_FAIL,
} from "../constants/audioConstants";

const API_URL = "http://localhost:5000/api";

// Step 1: Upload files to Cloudinary via /api/upload
// Step 2: Save metadata (with returned URLs) to /api/admin/audio
export const uploadAudio = (formData) => async (dispatch) => {
  try {
    dispatch({ type: AUDIO_UPLOAD_REQUEST });

    // Upload files — backend handles Cloudinary via multer-storage-cloudinary
    const { data: uploadData } = await axios.post(
      `${API_URL}/upload`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (!uploadData.audioUrl || !uploadData.imageUrl) {
      throw new Error("File upload failed — missing URLs from server");
    }

    // Save metadata to DB
    const { data } = await axios.post(
      `${API_URL}/admin/audio`,
      {
        title: formData.get("title"),
        category: formData.get("category"),
        audioUrl: uploadData.audioUrl,
        coverImageUrl: uploadData.imageUrl,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: AUDIO_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUDIO_UPLOAD_FAIL,
      payload: error.response?.data?.message || error.message,
    });
    // Re-throw so the component's catch block can show the toast
    throw error;
  }
};

// Fetch all audios
export const listAudios = () => async (dispatch) => {
  try {
    dispatch({ type: AUDIO_LIST_REQUEST });

    const { data } = await axios.get(`${API_URL}/audios`);

    dispatch({
      type: AUDIO_LIST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: AUDIO_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};