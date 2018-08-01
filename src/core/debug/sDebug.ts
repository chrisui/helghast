import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Plot from 'react-plotly.js';
import {flatten, groupBy, map, partition, sortBy} from 'lodash';

import benchmark from './sBenchmark';
import {Application} from '../../framework/Application';

const FRAMES_HISTORY_SIZE = 1440; // 10 seconds @ 144hz

const ORDER = ['update', 'render', 'debug:update', 'frameTime'];

export class Debug {
  private frameTimings: [string, number][][] = [];

  public update(app: Application, delta: number) {
    benchmark.start('debug:update');
    if (app.frame === 30) {
      // buffer to avoid logging browser churn on startup
      benchmark.flushTimings();
    } else if (app.frame > 30) {
      benchmark.push('frameTime', delta);
      this.addLastFrameTimings(benchmark.flushTimings());
    }

    // move rendering to render loop
    this.render();
  }

  private addLastFrameTimings(timings: [string, number][]) {
    // cap amount of historic data we're keeping
    if (this.frameTimings.length > FRAMES_HISTORY_SIZE) {
      this.frameTimings.splice(
        0,
        this.frameTimings.length - FRAMES_HISTORY_SIZE,
      );
    }

    this.frameTimings.push(timings);
  }
  private render() {
    const traces = partition(
      sortBy(
        map(
          groupBy(flatten(this.frameTimings), '0'),
          (timings: [string, number][], name: string) => ({
            // type: 'scattergl',
            // mode: 'lines',
            x: timings.map((v, i) => i + 1),
            y: timings.map((v) => v[1]),
            name,
            line: {
              color: name === 'frameTime' ? 'rgb(100, 100, 100)' : undefined,
              width: 0.5,
            },
          }),
        ),
        (obj) => ORDER.indexOf(obj.name),
      ),
      (obj) => obj.name === 'frameTime',
    );

    const debugEl = document.getElementById('debug') as HTMLElement;
    stackArea(traces[1]);
    const data = [...traces[1], ...traces[0]];
    ReactDOM.render(
      // @ts-ignore Plot errornous type
      React.createElement(Plot, {
        data,
        layout: {
          font: {
            color: 'rgb(255, 255, 255)',
          },
          xaxis: {
            gridcolor: 'rgb(30, 30, 30)',
          },
          yaxis: {
            gridcolor: 'rgb(30, 30, 30)',
          },
          title: '',
          width: debugEl.getBoundingClientRect().width,
          height: debugEl.getBoundingClientRect().height,
          margin: {t: 5, r: 30, b: 20, l: 30},
          paper_bgcolor: 'rgba(0, 0, 0, 0)',
          plot_bgcolor: 'rgba(0, 0, 0, 0)',
        },
        config: {displayModeBar: false, showLink: false},
      }),
      debugEl,
      () => benchmark.end('debug:update'),
    );
  }
}

type PlotlyFill = 'tonexty' | 'tozeroy' | undefined;

function stackArea(
  traces: {x: number[]; y: number[]; name: string; fill?: PlotlyFill}[],
) {
  for (let i = 0; i < traces.length; i++) {
    if (i === 0) {
      traces[i].fill = 'tozeroy';
    } else {
      traces[i].fill = 'tonexty';
      for (
        let j = 0;
        j < Math.min(traces[i].y.length, traces[i - 1].y.length);
        j++
      ) {
        traces[i].y[j] += traces[i - 1].y[j];
      }
    }
  }
  return traces;
}

export default new Debug();
