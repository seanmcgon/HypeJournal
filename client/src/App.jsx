import { useState } from "react";
// import './App.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Components/Login";
import TaskInput from "./Components/TaskInput";
import HypeResponse from "./Components/HypeResponse";

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="App min-h-screen bg-gray-900 p-10 flex flex-col items-center min-w-screen">
          <h1 className="text-5xl font-bold text-red-600 mb-6 text-shadow-md/50 text-shadow-fuchsia-500">
            HypeJournal
          </h1>
          <div className="flex flex-col items-center justify-center p-4 min-w-screen">
            {!name && (
              <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                <Login setName={setName} />
              </div>
            )}
            {name && (
              <>
                <div className="w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Hey {name}!
                  </h2>
                  <TaskInput setResponse={setResponse}/>
                </div>
                {response && <HypeResponse response={response}/>}
              </>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
