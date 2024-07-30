import { useState } from "react";
import axios from "axios";
import Arrow from "../../Components/Icons/arrow";
import Message from "../../Components/MessageBox/Message";
// w-96 sm:w-[32rem] md:w-[42rem]
function Chatbot() {
  const [messageList, setMessageList] = useState([]);
  const [inputVal, setInputVal] = useState();
  const [disable, setDisable] = useState(false);
  const [thinking, setThinking] = useState(false);
  function makeHistory() {
    let history = [];
    messageList.forEach((element) => {
      var jsonObj = {
        role: element.props.type,
        parts: [{ text: element.props.body }],
      };
      history.push(jsonObj);
    });
    return history;
  }

  async function sendQuery(query) {
    const userMessage = <Message body={query} type="user" />;
    setMessageList((prevMessageList) => [...prevMessageList, userMessage]);
    setDisable(true);
    setInputVal("");
    setThinking(true);
    try {
      const response = await axios.post("http://localhost:5000/chatbot/", {
        text: query,
        history: makeHistory(messageList),
      });
      const modelMessage = <Message body={response.data} type="model" />;
      setMessageList((prevMessageList) => [...prevMessageList, modelMessage]);
    } catch (error) {
      console.log(error);
    } finally {
      setDisable(false);
      setThinking(false);
    }
    console.log(messageList);
  }
  return (
    <div className="">
      <div className="flex flex-col w-[28rem] sm:w-[36rem] md:w-[46rem] pb-28 mx-auto ">
        <div className="">
          {messageList.map((message, index) => (
            <Message {...message.props} key={index} />
          ))}
        </div>
        <div className="flex flex-col fixed inset-x-0 bottom-0 bg-transparent backdrop-blur-2xl bg-opacity-50 px-5">
          {thinking ? (
            <h1 className="py-2 animate-fade-in text-center text-white">
              Assistant is thinking . . .
            </h1>
          ) : null}
          <div className="flex flex-row justify-center pb-10 ">
            <input
              type="text"
              value={inputVal}
              disabled={disable}
              autoFocus={true}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              onKeyDown={(e) => {
                // Use onKeyDown for broader compatibility
                if (e.key === "Enter" && !disable) {
                  // Check for Enter key and disabled state
                  sendQuery(inputVal);
                }
              }}
              placeholder="Enter your query here"
              className="flex bg-white rounded-l-xl w-96 sm:w-[32rem] md:w-[42rem] px-5 py-3  text-black focus:border-none"
            />
            <button
              className="bg-primary-color transition duration-150 ease-in-out hover:bg-blue-800 rounded-r-xl text-white px-3 py-3 text-sm"
              disabled={disable}
              onClick={() => {
                sendQuery(inputVal);
              }}
            >
              <Arrow color="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
