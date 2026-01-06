import { useState } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import ChatMessages from './components/ChatMessages.jsx'
import './App.css'   

function App() {
        const [chatMessages, setChatMessages] = useState([
          { message: "hello chatbot", sender: "user", id: "id1" },
          { message: "how are you?", sender: "robot", id: "id2" },
          { message: "tell me a joke", sender: "user", id: "id3" },
          { message: "xddxdddxdddddddxdd", sender: "robot", id: "id4" }
        ]);

        return (
          <div className="app-container">
            <ChatMessages 
              chatMessages = {chatMessages}
            />
            <ChatInput 
              chatMessages = {chatMessages}
              setChatMessages = {setChatMessages}
            />
          </div>
        );
      }

export default App
