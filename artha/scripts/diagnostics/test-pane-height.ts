import { createChart } from 'lightweight-charts';
const chart = createChart(document.createElement('div'));
chart.addPane();
chart.panes().forEach(p => console.log(p.getHeight()));
