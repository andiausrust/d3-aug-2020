const data = [
    { width: 200, height: 100, fill: 'purple' }
]

const svg = d3.select('svg');

const rect = svg.select('rect')
    .data(data)
    .attr('width', data => data.width)
    .attr('height', data => data.height)
    .attr('fill', data => data.fill);

console.log(rect);
