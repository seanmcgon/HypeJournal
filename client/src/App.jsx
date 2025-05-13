import { useState, useEffect } from "react";
import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Components/Login";
import TaskInput from "./Components/TaskInput";
import HypeResponse from "./Components/HypeResponse";

const mockData = [
  { timestamp: 1747149707000, message: "Test" },
  { timestamp: 1747153307000, message: "Test" },
  { timestamp: 1747156907000, message: "Test" },
  { timestamp: 1747070507000, message: "Test" },
  { timestamp: 1747066907000, message: "Test" },
  { timestamp: 1746980507000, message: "Test" },
];

function label(timestamp, value, dayjsDate) {
  return `${value > 0 ? value : "No"} task${
    value === 1 ? "" : "s"
  } completed on ${dayjsDate.format("MMMM D")}`;
}

function App() {
  const [name, setName] = useState("");
  const [response, setResponse] = useState("");

  // When logging dates, just call Date.now() for timestamp
  // Also, don't have to worry about summing over days, the heatmap will aggregate for us

  useEffect(() => {
    const cal = new CalHeatmap();
    const year = new Date().getFullYear();
    cal.paint(
      {
        domain: { type: "month", gutter: 2 },
        subDomain: { type: "ghDay", radius: 2 },
        date: { start: new Date(year, 0) },
        data: {
          source: mockData,
          x: "timestamp",
          y: "message",
          groupY: "count",
          defaultValue: 0,
        },
        scale: {
          color: {
            range: ["#111827", "#80fc4e"],
            interpolate: "hsl",
            domain: [0, 5],
          },
        },
        theme: "dark",
      },
      [[Tooltip, { enabled: true, text: label }]]
    );
  }, [name]);

  return (
    <>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <div className="App min-h-screen bg-gray-900 p-6 flex flex-col items-center overflow-x-hidden">
          <h1 className="text-5xl font-bold text-fuchsia-500 mb-6 text-shadow-md/60 text-shadow-sky-500">
            HypeJournal
          </h1>
          <div className="flex flex-col items-center justify-center p-4 min-w-screen">
            {!name && (
              <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col items-center">
                <Login setName={setName} />
              </div>
            )}
            {name && (
              <div className="flex flex-col items-center">
                <div className="w-full max-w-lg bg-gray-800 shadow-md rounded-lg p-6 text-center">
                  <h2 className="text-2xl font-semibold text-white mb-4">
                    Hey {name}!
                  </h2>
                  <TaskInput setResponse={setResponse} />
                </div>
                {response && <HypeResponse response={response} />}
                <div
                  id="cal-heatmap"
                  className="m-6 p-2 rounded-lg bg-gray-800"
                ></div>
              </div>
            )}
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
