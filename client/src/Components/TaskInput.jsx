import { useState } from "react";

export default function TaskInput({ setResponse, email, setLogs, setLoading }) {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  async function submitTask(e) {
    e.preventDefault();
    if (task === "") return;
    const temp = task;
    setTask("");
    setResponse("");
    setLoading(true);

    try {
      const response = await fetch("/api/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: temp, email: email }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      setLogs(json.logs);
      setLoading(false);
      const letters = json.message.split("");
      letters.forEach((_, index) => {
        setTimeout(() => {
          setResponse(json.message.slice(0, index + 1));
        }, 10 * index);
      });
    } catch (error) {
      console.error(error.message);
    }    
  }

  return (
    <form
      onSubmit={submitTask}
      className="flex flex-col items-center bg-gray-700 p-4 rounded-lg shadow-md w-full"
    >
      <input
        name="task"
        placeholder="What did you do today?"
        maxLength={150}
        onChange={handleChange}
        value={task}
        autoComplete="off"
        className="w-full border bg-gray-500 rounded-md p-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
      />
      <div
        className={`mt-2 text-sm ${
          task.length >= 140 ? "text-red-500" : "text-gray-400"
        }`}
      >
        {task.length} / 150
      </div>
      <button
        type="submit"
        className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200 active:bg-gray-600"
      >
        Submit
      </button>
    </form>
  );
}
