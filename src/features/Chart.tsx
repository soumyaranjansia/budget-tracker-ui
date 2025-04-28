import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

// Define a more appropriate type for `data`
interface DataItem {
  title: string;
  amount: number;
}

interface ChartProps {
  data: DataItem[];  // Now data is an array of objects with title and amount properties
}

const Chart = ({ data }: ChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);  // Type ref as SVG element
  console.log(data);

  useEffect(() => {
    if (!data || data.length === 0) {
      return; // Exit early if no data is passed
    }

    // Clean up any previous chart content
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 500;
    const height = 300;

    svg.attr("width", width).attr("height", height);

    // Define the X and Y scales for the chart
    const x = d3.scaleBand()
      .domain(data.map(d => d.title)) // Mapping titles for the X axis
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.amount) ?? 0]) // Using d3.max safely with fallback to 0
      .nice()
      .range([height, 0]);

    // Create bars for the chart
    svg.selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.title) ?? 0)
      .attr("y", d => y(d.amount))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.amount))
      .attr("fill", "steelblue");

    // Add X axis with labels
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0)); // Removing tick size for a cleaner look

    // Add Y axis with labels
    svg.append("g")
      .call(d3.axisLeft(y).ticks(5));

    // Optional: Add labels to the bars
    svg.selectAll(".text")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "text")
      .attr("x", d => (x(d.title) ?? 0) + x.bandwidth() / 2) // Handling undefined
      .attr("y", d => (y(d.amount) ?? 0) - 10) // Handling undefined
      .attr("text-anchor", "middle")
      .text(d => `₹${d.amount}`);
  }, [data]);

  return <svg ref={svgRef}></svg>; // Ensure the SVG element has the ref for D3.js
};

export default Chart;
