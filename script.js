// Datos de ejemplo
const ventasPorMes = [
    { mes: 'Enero', ventas: 3000 },
    { mes: 'Febrero', ventas: 4500 },
    { mes: 'Marzo', ventas: 4000 },
    { mes: 'Abril', ventas: 5000 },
    { mes: 'Mayo', ventas: 7000 },
    { mes: 'Junio', ventas: 6000 }
  ];
  
  const ventasPorCategoria = [
    { categoria: 'Electrónica', ventas: 30000 },
    { categoria: 'Ropa', ventas: 15000 },
    { categoria: 'Hogar', ventas: 10000 },
    { categoria: 'Libros', ventas: 5000 }
  ];
  
  // Gráfico de Líneas: Ventas por Mes
  const lineChart = d3.select("#lineChart");
  const lineWidth = 500, lineHeight = 300;
  
  const xScale = d3.scaleBand()
    .domain(ventasPorMes.map(d => d.mes))
    .range([0, lineWidth])
    .padding(0.1);
  
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(ventasPorMes, d => d.ventas)])
    .range([lineHeight, 0]);
  
  const lineSvg = lineChart.append("svg")
    .attr("width", lineWidth)
    .attr("height", lineHeight + 50);
  
  lineSvg.append("g")
    .attr("transform", "translate(0," + lineHeight + ")")
    .call(d3.axisBottom(xScale));
  
  lineSvg.append("g")
    .call(d3.axisLeft(yScale));
  
  const line = d3.line()
    .x(d => xScale(d.mes))
    .y(d => yScale(d.ventas));
  
  lineSvg.append("path")
    .datum(ventasPorMes)
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 2)
    .attr("d", line);
  
  // Gráfico de Pastel: Participación por Categoría
  const pieChart = d3.select("#pieChart");
  const pieRadius = Math.min(lineWidth, lineHeight) / 2;
  const pieColor = d3.scaleOrdinal(d3.schemeCategory10);
  
  const pie = d3.pie().value(d => d.ventas);
  const arc = d3.arc().innerRadius(0).outerRadius(pieRadius);
  
  const pieSvg = pieChart.append("svg")
    .attr("width", lineWidth)
    .attr("height", lineHeight)
    .append("g")
    .attr("transform", "translate(" + lineWidth / 2 + "," + lineHeight / 2 + ")");
  
  pieSvg.selectAll("path")
    .data(pie(ventasPorCategoria))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", d => pieColor(d.data.categoria))
    .append("title")
    .text(d => `${d.data.categoria}: ${d.data.ventas}`);
  
  // Gráfico de Barras: Comparación de Categorías
  const barChart = d3.select("#barChart");
  const barWidth = 600, barHeight = 300;
  
  const barXScale = d3.scaleBand()
    .domain(ventasPorCategoria.map(d => d.categoria))
    .range([0, barWidth])
    .padding(0.2);
  
  const barYScale = d3.scaleLinear()
    .domain([0, d3.max(ventasPorCategoria, d => d.ventas)])
    .range([barHeight, 0]);
  
  const barSvg = barChart.append("svg")
    .attr("width", barWidth)
    .attr("height", barHeight + 50);
  
  barSvg.append("g")
    .attr("transform", "translate(0," + barHeight + ")")
    .call(d3.axisBottom(barXScale));
  
  barSvg.append("g")
    .call(d3.axisLeft(barYScale));
  
  barSvg.selectAll("rect")
    .data(ventasPorCategoria)
    .enter()
    .append("rect")
    .attr("x", d => barXScale(d.categoria))
    .attr("y", d => barYScale(d.ventas))
    .attr("width", barXScale.bandwidth())
    .attr("height", d => barHeight - barYScale(d.ventas))
    .attr("fill", "teal");
  