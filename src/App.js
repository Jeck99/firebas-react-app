import React from 'react';
import './App.css';
import FirebaseProvider from './context/firebase-context';
import Header from './components/features/Header/Header';
import ChatPage from './components/pages/Chat-Page/Chat-Page';
function App() {
  return (
    <div className="App">
      <FirebaseProvider>
          <Header />
        <ChatPage />
      </FirebaseProvider>
    </div>
  );
}

export default App;
