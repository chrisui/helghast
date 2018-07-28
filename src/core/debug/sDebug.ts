import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Plot from 'react-plotly.js';
import {flatten, groupBy, map} from 'lodash';
const FRAMES_HISTORY_SIZE = 4320; // 30 seconds @ 144hz

export class Debug {
  private frameTimings: [string, number][][] = [];
  public addLastFrameTimings(timings: [string, number][]) {
    // cap amount of historic data we're keeping
    if (this.frameTimings.length > FRAMES_HISTORY_SIZE) {
      this.frameTimings.splice(
        0,
        this.frameTimings.length - FRAMES_HISTORY_SIZE
      );
    }

    this.frameTimings.push(timings);
    this.render();
  }
  private render() {
    const traces = map(
      groupBy(flatten(this.frameTimings), '0'),
      (timings: [string, number][], name: string) => ({
        x: timings.map((v, i) => i + 1),
        y: timings.map((v) => v[1]),
        name,
      })
    );

    const debugEl = document.getElementById('debug') as HTMLElement;
    const data = stackedArea(traces);
    ReactDOM.render(
      React.createElement(Plot, {
        data,
        layout: {
          title: '',
          autosize: true,
          width: debugEl.getBoundingClientRect().width,
          height: debugEl.getBoundingClientRect().height,
          margin: {t: 0, r: 30, b: 0, l: 30},
        },
        useResizeHandler: true,
        config: {displayModeBar: false, showLink: false},
      }),
      debugEl
    );
  }
}

type PlotlyFill = 'tonexty' | 'tozeroy' | undefined;

function stackedArea(
  traces: {x: number[]; y: number[]; name: string; fill?: PlotlyFill}[]
) {
  for (let i = 1; i < traces.length; i++) {
    // todo: dont special case frameTime but allow declarative config
    //       of what different names stack/how individual time series render
    if (traces[i].name === 'frameTime') {
      continue;
    } else if (i === 0) {
      traces[i].fill = 'tozeroy';
    } else {
      traces[i].fill = 'tonexty';
    }
    for (
      let j = 0;
      j < Math.min(traces[i].y.length, traces[i - 1].y.length);
      j++
    ) {
      traces[i].y[j] += traces[i - 1].y[j];
    }
  }
  return traces;
}

export default new Debug();
