import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux-toolkit';
import { useSelector, useDispatch } from 'react-redux'
import { toggleDarkMode, selectIsDarkMode } from '../store/themeSlice';
import { useSpeechRecognition } from 'react-speech-recognition';

const Settings = () => {
  // const isDarkMode=true;
  const { transcript, resetTranscript} = useSpeechRecognition();
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(()=>{

    const command = transcript.toLowerCase();
    
    if (command === "change the theme") {
      dispatch(toggleDarkMode());
      resetTranscript();
    }

  },[transcript,resetTranscript,dispatch])

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };


  return (
    <div className={`w-full h-full ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className='container mx-auto min-h-screen'>
      {/* <div className={`p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
       */}
      <div>
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
      <div className="flex items-center">
        <label className="mr-2">Dark Mode:</label>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggleDarkMode}
          className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
        />
      </div>
    </div>
    </div>
    </div>
    
    
  );
};

export default Settings;
