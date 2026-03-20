import { createChart } from 'lightweight-charts';
const div = document.createElement('div');
const chart = createChart(div, { width: 800, height: 600 });
chart.addPane();
console.log(div.innerHTML.substring(0, 500));
