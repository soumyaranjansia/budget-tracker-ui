import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface BudgetSummary {
  budget_amount: number;
  total_income: number;
  total_expense: number;
  balance: number;
  budget_difference: number;
}

interface BudgetDonutChartProps {
  data: BudgetSummary;
}

const BudgetDonutChart = ({ data }: BudgetDonutChartProps) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!data) return;

    const width = 360;
    const height = 360;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear previous drawings
    svg.attr('width', width).attr('height', height);

    const chart = svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    // Calculate values
    const usedIncome = data.total_income;
    const unusedBudget = Math.max(0, data.budget_amount - usedIncome); // if any budget left unused

    const values = [
      data.total_expense,
      data.balance,
      unusedBudget
    ];

    const labels = ["Expense", "Balance", "Remaining Budget"];

    const color = d3.scaleOrdinal<string>()
      .domain(labels)
      .range(["#F44336", "#4CAF50", "#BDBDBD"]); // Red, Green, Gray

    const pie = d3.pie<number>().value(d => d).sort(null);
    const arcs = pie(values);

    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(radius * 0.6)
      .outerRadius(radius - 10)
      .padAngle(0.02);

    // Draw slices
    chart.selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('d', arc as any)
      .attr('fill', (_, i) => color(labels[i]))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Add percentage labels inside arcs
    chart.selectAll('text')
      .data(arcs)
      .enter()
      .append('text')
      .text((d, i) => {
        const total = d3.sum(values);
        const percent = ((d.data / total) * 100).toFixed(1);
        return values[i] === 0 ? "" : `${percent}%`;
      })
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', 'white');

    // Add Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${20}, ${20})`);

    labels.forEach((label, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 22})`);

      legendRow.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(label));

      legendRow.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .attr('text-anchor', 'start')
        .style('font-size', '13px')
        .text(label);
    });

  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default BudgetDonutChart;
