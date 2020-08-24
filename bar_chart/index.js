const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600);

// create margins and dimensions
const margins = { top: 20, right: 20, bottom: 100, left: 100 };
const grapWidth = 600 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const graph = svg.append('g')
    .attr('width', grapWidth)
    .attr('height', graphHeight)
    .attr('transform', `translate(${margins.left}, ${margins.top})`);

const xAxisGroup = graph.append('g')
    .attr('transform', `translate(0, ${graphHeight})`);
const yAxisGroup = graph.append('g');

d3.json('./menu.json').then(data => {

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.orders)])
        .range([graphHeight, 0]);

    const x = d3.scaleBand()
        .domain(data.map(item => item.name))
        .range([0, 500])
        .paddingInner(0.2)
        .paddingOuter(0.2);

    // join the data to circs
    const rects = graph.selectAll('rect')
        .data(data);

    // add attrs to circs already in the DOM
    rects.attr('width', x.bandwidth)
        .attr('y', d => y(d.orders))
        .attr("height", d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));

    rects.enter()
        .append('rect')
        .attr('y', d => y(d.orders))
        .attr('width', x.bandwidth)
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => x(d.name));

    // create and call the axis
    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y)
        .ticks(3)
        .tickFormat(d => d + ' orders');

    xAxisGroup.call(xAxis);
    yAxisGroup.call(yAxis);

    xAxisGroup.selectAll('text')
        .attr('transform', 'rotate(-40)')
        .attr('text-anchor', 'end');
});
