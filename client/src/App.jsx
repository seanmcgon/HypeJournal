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
  const [yrSelect, setYrSelect] = useState(new Date().getFullYear());

  const filteredLogsCount = logs.filter((doc) => {
    const year = new Date(doc.timestamp).getFullYear();
    return year === yrSelect;
  }).length;

  const minYear =
    logs.length > 0
      ? Math.min(...logs.map((doc) => new Date(doc.timestamp).getFullYear()))
      : null;

  const yearOptions = [];
  if (minYear) {
    for (let i = new Date().getFullYear() - 1; i >= minYear; --i) {
      yearOptions.push(i);
    }
  }

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="App min-h-screen max-w-screen bg-gray-900 p-6 flex flex-col items-center inset-shadow-[0_0_100px_rgba(217,70,239,0.2)]">
          <h1 className="text-5xl font-bold text-fuchsia-500 text-shadow-md/60 text-shadow-sky-500">
            HypeJournal
          </h1>
          <div className="flex flex-col items-center justify-center">
            {!name && (
              <div className="w-full bg-white shadow-md rounded-lg p-6 m-4 flex flex-col items-center">
                <Login
                  setName={setName}
                  setEmail={setEmail}
                  setLogs={setLogs}
                />
              </div>
            )}
            {name && (
              <div className="flex flex-col items-center max-w-screen">
                <div className="flex flex-row items-center mt-4 mb-2 gap-4">
                  <p className="m-0 leading-none inline">
                    {`${filteredLogsCount} ${
                      filteredLogsCount === 1 ? "activity" : "activities"
                    } logged ${
                      yrSelect === new Date().getFullYear()
                        ? "this year"
                        : `in ${yrSelect}`
                    }`}
                  </p>
                  <select
                    className="rounded-md border border-fuchsia-400 bg-gray-800 text-white px-3 py-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 transition"
                    value={yrSelect}
                    onChange={(e) => setYrSelect(Number(e.target.value))}
                  >
                    <option value={new Date().getFullYear()}>
                      {new Date().getFullYear()}
                    </option>
                    {yearOptions.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <Tracker logs={logs} year={yrSelect} />
                <div className="w-full max-w-11/12 bg-gray-800 shadow-md rounded-lg p-6 text-center">
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
