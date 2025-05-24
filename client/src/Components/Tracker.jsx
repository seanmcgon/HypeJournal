import CalHeatmap from "cal-heatmap";
import Tooltip from "cal-heatmap/plugins/Tooltip";
import { useRef } from "react";

function label(timestamp, value, dayjsDate) {
  return `${value > 0 ? value : "No"} task${
    value === 1 ? "" : "s"
  } completed on ${dayjsDate.format("MMMM D")}`;
}

export default function Tracker({ logs }) {
  const cal = useRef(new CalHeatmap());
  const year = new Date().getFullYear();
  cal.current.paint(
    {
      domain: { type: "month", gutter: 2 },
      subDomain: { type: "ghDay", radius: 2 },
      date: { start: new Date(year, 0) },
      data: {
        source: logs,
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

  return (
    <div id="cal-heatmap" className="m-6 p-2 rounded-lg bg-gray-800"></div>
  );
}
