"use client";
import { useEffect, useRef } from "react";
import * as d3 from "d3";

export default function BubbleChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const data = [
      { name: "삼성전자", value: 120 },
      { name: "AI", value: 250 },
      { name: "하이닉스", value: 80 },
      { name: "금리", value: 150 },
      { name: "비트코인", value: 100 },
      { name: "ETF", value: 60 },
      { name: "전기차", value: 130 },
    ];

    const width = 500;
    const height = 400;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const root = d3
      .pack()
      .size([width, height])
      .padding(5)(
        d3
          .hierarchy({ children: data } as any)
          .sum((d: any) => d.value)
      );

    const color = d3.scaleOrdinal(d3.schemeTableau10);

    const node = svg
      .attr("width", width)
      .attr("height", height)
      .selectAll("g")
      .data(root.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    node
      .append("circle")
      .attr("r", (d) => d.r)
      .attr("fill", (_, i) => color(String(i)));

    node
      .append("text")
      .text((d) => (d.data as { name: string; value: number }).name)
      .attr("text-anchor", "middle")
      .attr("dy", ".3em")
      .style("font-size", (d) => `${Math.min(d.r / 2, 14)}px`)
      .style("fill", "#fff");
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>bubble chart</h2>
      <svg ref={svgRef}></svg>
    </div>
  );
}
