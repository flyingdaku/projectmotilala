import { createChart } from 'lightweight-charts';
const div = document.createElement('div');
Object.defineProperty(div, 'clientWidth', { value: 800 });
Object.defineProperty(div, 'clientHeight', { value: 600 });
const chart = createChart(div, { width: 800, height: 600 });
chart.addPane();
const panes = chart.panes();
console.log(panes.map((p, i) => chart.paneSize(i)));
