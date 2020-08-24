const data = [
    { width: 200, height: 100, fill: 'purple' }
    { width: 100, height: 60, fill: 'red' }
    { width: 50, height: 30, fill: 'green' }
]

const svg = d3.select('svg');

const rect = svg.selectAll('rect')
    .data(data)
    .attr('width', data => data.width)
    .attr('height', data => data.height)
    .attr('fill', data => data.fill);

console.log(rect);
