import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Components/Login";
import TaskInput from "./Components/TaskInput";
import HypeResponse from "./Components/HypeResponse";
import Tracker from "./Components/Tracker";
import { PulseLoader } from "react-spinners";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [logs, setLogs] = useState([]);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="App min-h-screen bg-gray-900 p-6 flex flex-col items-center overflow-x-hidden">
          <h1 className="text-5xl font-bold text-fuchsia-500 text-shadow-md/60 text-shadow-sky-500">
            HypeJournal
          </h1>
          <div className="flex flex-col items-center justify-center p-4 min-w-screen">
            {!name && (
              <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 m-4 flex flex-col items-center">
                <Login
                  setName={setName}
                  setEmail={setEmail}
                  setLogs={setLogs}
                />
              </div>
            )}
            {name && (
              <div className="flex flex-col items-center">
                <Tracker logs={logs} />
                <div className="w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Hey {name}!
                  </h2>
                  <TaskInput
                    setResponse={setResponse}
                    email={email}
                    setLogs={setLogs}
                    setLoading={setLoading}
                  />
                </div>
                {loading && (
                  <div className="mt-16">
                    <PulseLoader color="#d946ef" />
                  </div>
                )}
                {response && <HypeResponse response={response} />}
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
