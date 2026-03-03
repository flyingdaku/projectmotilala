import { createChart } from 'lightweight-charts';
const chart = createChart(document.createElement('div'));
const panes = chart.panes();
panes[0].getHeight();
