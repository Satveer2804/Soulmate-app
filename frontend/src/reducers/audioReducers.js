import {
  AUDIO_UPLOAD_REQUEST,
  AUDIO_UPLOAD_SUCCESS,
  AUDIO_UPLOAD_FAIL,
  AUDIO_LIST_REQUEST,
  AUDIO_LIST_SUCCESS,
  AUDIO_LIST_FAIL,
} from "../constants/audioConstants";

export const audioUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case AUDIO_UPLOAD_REQUEST:
      return { loading: true };
    case AUDIO_UPLOAD_SUCCESS:
      return { loading: false, success: true };
    case AUDIO_UPLOAD_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const audioListReducer = (
  state = { audios: [] },
  action
) => {
  switch (action.type) {
    case AUDIO_LIST_REQUEST:
      return { loading: true, audios: [] };
    case AUDIO_LIST_SUCCESS:
      return { loading: false, audios: action.payload };
    case AUDIO_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};