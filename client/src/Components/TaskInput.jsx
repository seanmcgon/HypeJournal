import { useState } from "react";

export default function TaskInput() {
  const [task, setTask] = useState("");

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  function submitTask(e) {
    e.preventDefault();
    if (task === "") return;
    //TODO: submit to Mistral and log in db
    setTask("");
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
        className="w-full border bg-gray-500 rounded-md p-3 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-red-600"
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
        className="mt-3 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
}
