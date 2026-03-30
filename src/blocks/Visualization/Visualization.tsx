import PlotlyModule from "react-plotly.js";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Plot = (PlotlyModule as any).default;

import type { TrajectoryData } from "@/page/Page/Page.tsx";
interface VisualizationData {
  trajectoryData: TrajectoryData;
}
const Visualization = ({ trajectoryData }: VisualizationData) => {
  const maxVal = Math.max(
    ...trajectoryData.xValues,
    ...trajectoryData.yValues,
    ...trajectoryData.zValues,
  );

  const minVal = Math.min(
    ...trajectoryData.xValues,
    ...trajectoryData.yValues,
    ...trajectoryData.zValues,
  );

  return (
    <Plot
      data={[
        {
          x: trajectoryData.xValues,
          y: trajectoryData.yValues,
          z: trajectoryData.zValues,
          type: "scatter3d",
          mode: "lines",
        },
      ]}
      layout={{
        width: 700,
        height: 700,
        scene: {
          aspectmode: "cube",
          xaxis: { range: [minVal, maxVal] },
          yaxis: { range: [minVal, maxVal] },
          zaxis: { range: [minVal, maxVal] },
        },
        title: { text: "Графік прямолінійного рівноприскореного руху" },
      }}
    />
  );
};

export default Visualization;
