

"use client";
import LineChart from "./LineChart"; 
import BarChart from "./BarChart";
import BubbleChart from "./BubbleChart";

export default function Home() {
  return (
    <main style={{ padding: "20px" }}>
      <h1>그래프 샘플</h1>
      <LineChart/>
      <BarChart/>
      <BubbleChart/>
    </main>
  );
}
