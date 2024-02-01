import React,{useEffect} from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import { useSpeechRecognition } from 'react-speech-recognition';


const Header = () => {
  const navigate = useNavigate();
  // const startListening = () => SpeechRecognition.startListening({continuous:true,language:'en-IN'})
  const { transcript, resetTranscript} = useSpeechRecognition();


  useEffect(() => {
    console.log('in use effect',transcript)
    // Define voice commands and their corresponding routes
    const commandToRoute = {
      'go to news': '/news',
      'go to bookmarks': '/bookmarks',
      'go to notifications': '/notifications',
      'go to settings': '/settings',
    };

    // Convert the transcript to lowercase for case-insensitive matching
    const command = transcript.toLowerCase();

    // Check if the command is in the map
    if (commandToRoute[command]) {
      // Navigate to the corresponding route
      navigate(commandToRoute[command]);
      resetTranscript();
    }

    // Reset the transcript after processing the command
    // resetTranscript();
  }, [transcript, resetTranscript,navigate]);

  return (
    <div>
    <header className="bg-blue-500 text-white p-4 flex items-center justify-around">
      {/* Logo */}
      <Link to="/">
        <div className="text-2xl font-bold">LOGO</div>
      </Link>

      {/* Navigation Links */}
      <nav className="md:flex md:items-center space-x-16">
        <Link to="/news" className="hover:text-gray-300">
          News
        </Link>
        <Link to="/bookmarks" className="hover:text-gray-300">
          Bookmarks
        </Link>
        <Link to="/notifications" className="hover:text-gray-300">
          Notifications
        </Link>
        <Link to="/settings" className="hover:text-gray-300">
          Settings
        </Link>

      </nav>

      {/* Voice Recognition Buttons */}
      
        {/* <button
          className="bg-white text-blue-500 px-3 py-2 rounded"
          onClick={startListening}
        >
          Start Listening
        </button>
        <button
          className="bg-white text-blue-500 px-3 py-2 rounded"
          onClick={SpeechRecognition.stopListening}
        >
          Stop Listening
        </button> */}
       


      {/* Display Transcription */}
    </header>
    
    </div>
  );
};

export default Header;
