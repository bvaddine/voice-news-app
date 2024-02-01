import './App.css';
import Header from './components/Header';
import React,{useState} from "react";
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { MdMic } from 'react-icons/md';
import SpeechRecognition from 'react-speech-recognition';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  // const { transcript, resetTranscript} = useSpeechRecognition();

  const [isListening, setIsListening] = useState(false);
  const handleMicPress = () => {
    SpeechRecognition.startListening({continuous:true,language:'en-IN'})
    setIsListening(true);
  };

  const handleMicRelease = () => {
    SpeechRecognition.stopListening();
    setIsListening(false);
  };
  return (
    <Provider store={store}>
    <div>
      <Header/>
      <div
        className={`mic-icon p-2 border border-slate-500 rounded-full fixed ml-8 mt-4 text-3xl text-blue-500 transition-colors ${isListening ? 'animate-pulse bg-green-500' : 'bg-white'}`}
        onMouseDown={handleMicPress}
        onMouseUp={handleMicRelease}
        onMouseLeave={handleMicRelease}
      >
        <MdMic />
      </div>
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
    </Provider>
  );
}

export default App;
