import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadAudio } from "../actions/audioActions";
import { toast } from "react-toastify";

const UploadAudioScreen = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("english");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const handleAudioChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!audioFile || !imageFile) {
      toast.error("Please select both an audio file and a cover image.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("audio", audioFile);
      formData.append("image", imageFile);

      await dispatch(uploadAudio(formData));
      toast.success("Audio uploaded successfully!");
      handleReset();
    } catch (error) {
      toast.error(error?.message || "Failed to upload audio");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setCategory("english");
    setAudioFile(null);
    setImageFile(null);
    setCoverPreview(null);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Upload Audio</h1>
        <p className="text-sm text-gray-500 mt-1">Add new music to the platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left - Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">

            {/* Card Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-gray-800">Track Details</h2>
                <p className="text-xs text-gray-400">Fill in all required fields</p>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={submitHandler} className="p-6 space-y-6">

              {/* Title + Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Track Title <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-400"
                      placeholder="Enter track title"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    </div>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white appearance-none"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="punjabi">Punjabi</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio File Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Audio File <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    {audioFile ? (
                      <span className="text-sm font-medium text-blue-600">{audioFile.name}</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-500">Click to select audio file</span>
                        <span className="text-xs text-gray-400 mt-1">MP3, WAV, AAC, OGG supported</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {/* Cover Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Cover Image <span className="text-red-500">*</span>
                </label>
                <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors group">
                  <div className="flex flex-col items-center text-center">
                    <svg className="w-8 h-8 text-gray-300 group-hover:text-blue-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {imageFile ? (
                      <span className="text-sm font-medium text-blue-600">{imageFile.name}</span>
                    ) : (
                      <>
                        <span className="text-sm font-medium text-gray-500">Click to select cover image</span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP — square (1:1) recommended</span>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    required
                  />
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-sm"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      Upload Track
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right - Preview Panel */}
        <div className="lg:col-span-1 space-y-4">

          {/* Cover Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Cover Preview</h3>
            {coverPreview ? (
              <div className="space-y-3">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full aspect-square rounded-lg object-cover border border-gray-100 shadow-sm"
                />
                <p className="text-xs text-green-500 flex items-center">
                  <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Image selected
                </p>
              </div>
            ) : (
              <div className="w-full aspect-square rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-300">
                <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-xs">No image yet</p>
              </div>
            )}
          </div>

          {/* Track Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Track Summary</h3>
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="text-xs text-gray-400">Title</span>
                <span className="text-xs font-medium text-gray-700 text-right max-w-32 truncate">
                  {title || '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Category</span>
                <span className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full capitalize">
                  {category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Audio</span>
                <span className={`text-xs font-medium ${audioFile ? 'text-green-500' : 'text-gray-300'}`}>
                  {audioFile ? '✓ File selected' : '—'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">Cover</span>
                <span className={`text-xs font-medium ${imageFile ? 'text-green-500' : 'text-gray-300'}`}>
                  {imageFile ? '✓ File selected' : '—'}
                </span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-blue-50 rounded-xl border border-blue-100 p-5">
            <h3 className="text-sm font-semibold text-blue-700 mb-3 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Tips
            </h3>
            <ul className="space-y-1.5 text-xs text-blue-600">
              <li className="flex items-start">
                <span className="mr-1.5 mt-0.5">•</span>
                Prefer MP3 or AAC for smaller file sizes
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 mt-0.5">•</span>
                Cover image should be square (1:1 ratio)
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 mt-0.5">•</span>
                Recommended image size: 500×500px
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadAudioScreen;