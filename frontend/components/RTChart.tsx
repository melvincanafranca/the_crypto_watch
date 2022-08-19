import React, { useRef } from "react";

import {
  Chart,
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  ChartData,
} from "chart.js";

import "chartjs-adapter-moment";

import { tailwindConfig, formatValue } from "@utilities";
import useLayoutEffect from "@utilities/useLayoutEffect";
import { PriceInfo } from "@state";

Chart.register(
  LineController,
  LineElement,
  Filler,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip
);

export interface RTChartProps {
  width: number;
  height: number;
  data: ChartData;
  stockInfo: PriceInfo | null;
}

function RTChart({ data, width, height, stockInfo }: RTChartProps) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const chartValue = useRef<HTMLSpanElement>(null);
  const chartDeviation = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = canvas.current;
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: "line",
      data: data,
      options: {
        layout: {
          padding: 20,
        },
        scales: {
          y: {
            grid: {
              drawBorder: false,
            },
            ticks: {
              maxTicksLimit: 10,
              callback: (value) => formatValue(value as number),
            },
          },
          x: {
            type: "time",
            time: {
              parser: "hh:mm:ss",
              unit: "minute",
              tooltipFormat: "MMM DD, H:mm:ss a",
              displayFormats: {
                second: "H:mm:ss",
              },
            },
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              autoSkipPadding: 48,
              maxRotation: 0,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            titleFont: {
              weight: "600",
            },
            callbacks: {
              label: (context) => formatValue(context.parsed.y),
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: false,
        maintainAspectRatio: false,
        resizeDelay: 200,
      },
    });
    return () => chart.destroy();
  }, [data]);

  useLayoutEffect(() => {
    if (!chartValue.current || !chartDeviation.current || !stockInfo) return;

    chartValue.current.innerHTML = `${formatValue(stockInfo.lastPrice).replace(
      "$",
      ""
    )}`;

    if (stockInfo.change < 0) {
      chartDeviation.current.style.backgroundColor = (
        tailwindConfig()?.theme?.colors as any
      )?.red[500];
    } else {
      chartDeviation.current.style.backgroundColor = (
        tailwindConfig()?.theme?.colors as any
      )?.green[500];
    }
    chartDeviation.current.innerHTML = `${
      stockInfo.change > 0 ? "+" : ""
    }${stockInfo.change.toFixed(2)}%`;
  }, [data, stockInfo]);

  return (
    <React.Fragment>
      <div className="px-5 py-3">
        <div className="flex items-start">
          <div className="text-3xl font-bold text-slate-800 mr-2 tabular-nums">
            $<span ref={chartValue}>99.99</span>
          </div>
          <div
            ref={chartDeviation}
            className="text-sm font-semibold text-white px-1.5 rounded-full"
          ></div>
        </div>
      </div>
      <div className="grow">
        <canvas
          ref={canvas}
          data-data={data}
          width={width}
          height={height}
        ></canvas>
      </div>
    </React.Fragment>
  );
}

export default RTChart;
