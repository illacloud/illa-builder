import { ChartType } from "chart.js"
import { LegendPosition } from "./interface"
import { removeSubstitution } from "@/wrappedComponents/Chart/utils"

const isPie = (type: ChartType) => type === "pie"

export const formatPropsToChartOptions = (
  type: ChartType,
  title?: string,
  xType?: string,
  xTitle?: string,
  yTitle?: string,
  legendPosition?: LegendPosition,
  toolTips?: Map<string, string>,
) => {
  return {
    responsive: true,
    scales: {
      xAxis: {
        display: !isPie(type),
        type: xType,
        time: TimeConfig,
        title: {
          display: true,
          text: xTitle,
        },
      },
      yAxis: {
        display: !isPie(type),
        title: {
          display: true,
          text: yTitle,
        },
      },
    },
    parsing: {
      xAxisKey: "id",
    },
    plugins: {
      datalabels: {
        formatter: (value: any, ctx: any) => {
          return isPie(type) ? percentageFormat(value, ctx) : null
        },
      },
      tooltip: {
        enabled: true,
        position: "nearest",
        usePointStyle: false,
        callbacks: {
          label: function (context: any) {
            if (toolTips) {
              const _tip = toolTips.get(context.dataset.label) ?? ""
              const _map = {
                x: context.label,
                y:
                  context.parsed.y ?? percentageFormat(context.parsed, context),
                datasetLabel: context.dataset.label,
              }
              return removeSubstitution(_tip, _map)
            }
          },
          title: () => null,
        },
      },
      legend: {
        position: legendPosition,
        onClick: () => {},
      },
      title: {
        display: true,
        text: title,
      },
    },
  }
}

const percentageFormat = (value: any, ctx: any) => {
  let sum = 0
  let dataArr = ctx.chart.data.datasets[0].data
  dataArr.map((data: number) => {
    sum += data
  })
  return ((value * 100) / sum).toFixed(2) + "%"
}

const TimeConfig = {
  unit: "day",
  unitStepSize: 1,
  displayFormats: {
    millisecond: "MMM DD",
    second: "MMM DD",
    minute: "MMM DD",
    hour: "MMM DD",
    day: "MMM DD",
    week: "MMM DD",
    month: "MMM DD",
    quarter: "MMM DD",
    year: "MMM DD",
  },
}
