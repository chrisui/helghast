import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Plot from 'react-plotly.js';
import {flatten, groupBy, map, partition, sortBy} from 'lodash';

import {Accessor} from '../../framework/Accessor';
import {Game} from '../resources/Game';
import {DebugFrames} from '../resources/DebugFrames';
import {Services} from '../../runtime/Services';

const FRAMES_HISTORY_SIZE = 144; // 1 second @ 144hz

const ORDER = ['update', 'render', 'debug:update', 'frameTime'];

export class DebugManager {
  public static resources = [Game, DebugFrames];
}

export namespace DebugManager {
  export function process(dbg: DebugManager, accessor: Accessor) {
    const game: Game = accessor.get(Game);
    const debugFrames: DebugFrames = accessor.get(DebugFrames);

    Services.benchmark.push('frameTime', game.deltaTime * 1000);
    addLastFrameTimings(debugFrames, Services.benchmark.flush());

    // move rendering to render loop
    render(debugFrames);
  }
}

function addLastFrameTimings(
  debugFrames: DebugFrames,
  timings: [string, number][],
) {
  // cap amount of historic data we're keeping
  if (debugFrames.frameTimings.length > FRAMES_HISTORY_SIZE) {
    const numToRemove = debugFrames.frameTimings.length - FRAMES_HISTORY_SIZE;
    debugFrames.flushedNum += numToRemove;
    debugFrames.frameTimings.splice(0, numToRemove);
  }

  debugFrames.frameTimings.push(timings);
}

function render(debugFrames: DebugFrames) {
  const traces = partition(
    sortBy(
      map(
        groupBy(flatten(debugFrames.frameTimings), '0'),
        (timings: [string, number][], name: string) => ({
          // type: 'scattergl',
          // mode: 'lines',
          x: timings.map((v, i) => debugFrames.flushedNum + i),
          y: timings.map(v => v[1]),
          name,
          line: {
            color: name === 'frameTime' ? 'rgb(100, 100, 100)' : undefined,
            width: 0.5,
          },
        }),
      ),
      obj => ORDER.indexOf(obj.name),
    ),
    obj => obj.name === 'frameTime',
  );

  const debugEl = document.getElementById('debug') as HTMLElement;
  stackArea(traces[1]);
  const data = [...traces[1], ...traces[0]];
  ReactDOM.render(
    // @ts-ignore Plot errornous type
    React.createElement(Plot.default, {
      data,
      layout: {
        font: {
          color: 'rgb(255, 255, 255)',
        },
        xaxis: {
          gridcolor: 'rgb(30, 30, 30)',
        },
        yaxis: {
          visible: false,
          gridcolor: 'rgb(30, 30, 30)',
        },
        title: '',
        width: debugEl.getBoundingClientRect().width,
        height: debugEl.getBoundingClientRect().height,
        margin: {t: 5, r: 5, b: 20, l: 5},
        paper_bgcolor: 'rgba(0, 0, 0, 0)',
        plot_bgcolor: 'rgba(0, 0, 0, 0)',
      },
      config: {displayModeBar: false, showLink: false},
    }),
    debugEl,
  );
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
