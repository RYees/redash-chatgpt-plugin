import React,{ useState} from 'react'
import redashpng from "@/assets/images/favicon-96x96.png";
import './chatbox.less'
import Chat from '@/services/chat';


export default function ChatBox() {
  const [input, setInput] = useState("")
  const [open, setOpen] = useState(false)
  const [chatHistory, setChatHistory] = useState([]);

  const handler = (event) => {
    if (event.keyCode === 13) {      
      handleChatInput();
    }
  };

  function handleChatInput() {
    const data = { sender: "user", text: input };
    if (input !== "") {
      setChatHistory((history) => [...history, data]);
      chatWithOpenai(input);    
      setInput("");  
    }
  }

  async function chatWithOpenai(text) {
    const requestOptions = {
        question: text
    };
    const response = await Chat.openai(requestOptions);
    const data = {
      sender: "bot",
      text: response.answer
    };
     setChatHistory((history) => [...history, data]);
     setInput("");
  }
 

  return (
    <>
      {open?
      <div className='chatcontainer'>
        <div>
            <div className='headbox'>
              <p>query, visualize with AI</p>            
            </div>

            <div className='chatbox'>
              {chatHistory.map((chat, index) => (
                  <div key={index} className="chatcontain ">
                    {chat.sender === "user" ? (
                      <>
                        <div className="user">
                          <div className="">
                            <p className="parauser">{chat?.text}</p>
                          </div>
                        </div>
                
                      </>
                    ) : (
                      <>
                        <div className='ai'>
                            <div className="">
                              <p className="parai">{chat?.text}</p>
                            </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>

            <div className='inputbox'>        
              <input             
                  className="input"    
                  type="text"
                  value={input}
                  placeholder="Type your message…"
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => handler(e)}
              />
            </div>
        </div>
      </div>
      :null}

      <div className='iconbox' onClick={()=>setOpen(!open)}>
         <img alt="charimage" src={redashpng} className="icon" />
      </div>     
    </>
  )
}