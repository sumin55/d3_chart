"use client";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [
      { name: "삼성전자", price: 68000 },
      { name: "LG에너지솔루션", price: 400000 },
      { name: "NAVER", price: 180000 },
      { name: "카카오", price: 60000 },
      { name: "하이닉스", price: 120000 },
    ];

    const width = 500;
    const height = 300;
    const margin = { top: 20, right: 30, bottom: 50, left: 80 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.price)!])
      .nice()
      .range([height - margin.bottom, margin.top]);

    svg.attr("width", width).attr("height", height);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-20)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg
      .selectAll("rect")
      .data(data)
      .join("rect")
      .attr("x", (d) => x(d.name)!)
      .attr("y", (d) => y(d.price))
      .attr("width", x.bandwidth())
      .attr("height", (d) => height - margin.bottom - y(d.price))
      .attr("fill", "#0070f3");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>bar chart</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}
