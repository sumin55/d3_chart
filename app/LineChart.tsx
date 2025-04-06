"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function LineChart() {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [
      { date: new Date("2024-01-01"), value: 100 },
      { date: new Date("2024-01-05"), value: 150 },
      { date: new Date("2024-01-10"), value: 130 },
      { date: new Date("2024-01-15"), value: 180 },
      { date: new Date("2024-01-20"), value: 170 },
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); 

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => x((d as any).date))
      .y(d => y((d as any).value));

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(5));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "#0070f3")
      .attr("stroke-width", 2)
      .attr("d", line as any);
  }, []);

  return (
    <div>
      <h2>line chart</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}