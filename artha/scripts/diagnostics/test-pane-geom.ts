import { createChart } from 'lightweight-charts';
const chart = createChart(document.createElement('div'), { width: 800, height: 600 });
chart.addPane();
console.log(chart.paneSize(0));
console.log(chart.paneSize(1));
