import { createChart } from 'lightweight-charts';
const chart = createChart(document.createElement('div'), { width: 800, height: 600 });
const p1 = chart.addPane();
p1.setStretchFactor(15);
const panes = chart.panes();
panes.forEach((p, i) => console.log(i, chart.paneSize(i)));
