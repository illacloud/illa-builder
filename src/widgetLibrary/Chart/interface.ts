import { ChartType } from "chart.js"

export type LegendPosition = "top" | "bottom" | "right" | "left" | "hidden"
export type DatasetConfig = {
  key?: string
  name?: string
  values?: any[]
  type?: ChartType
  lineColor?: string | string[]
  aggregationMethod?: string
  toolTip?: string
  hidden?: boolean
  _beAdd?: boolean
}
export type ConfigType = "UIForm" | "JSON"

export interface DataObject {
  [key: string]: any
}

export interface WrappedChartProps {
  configType?: ConfigType // todo@aoao
  layoutConfigType?: ConfigType
  data?: DataObject[]
  title?: string
  type?: ChartType
  xAxisValues?: string
  groupBy?: string
  datasets?: DatasetConfig[]
  xTitle?: string
  xType?: string
  yTitle?: string
  chartJson?: string
  layoutJson?: string
  legendPosition?: LegendPosition
  initConfigByData?: (
    xAxis?: string[],
    groupBy?: string[],
    datasets?: DatasetConfig[],
    dataMap?: { [key: string]: any },
  ) => void
}
export const defaultChartData = [
  {
    region: "East",
    sales: 3700,
    spend: 4000,
  },
  {
    region: "West",
    sales: 6000,
    spend: 3895,
  },
  {
    region: "South",
    sales: 4500,
    spend: 5500,
  },
  {
    region: "Central",
    sales: 5230,
    spend: 4200,
  },
]

const testData = [
  { x: "Jan", net: 100, cogs: 50, gm: 50 },
  { x: "Feb", net: 120, cogs: 55, gm: 75 },
  { x: "Wed", net: 120, cogs: 55, gm: 75 },
  { x: "THUR", net: 120, cogs: 55, gm: 75 },
  { x: "Jan", net: 120, cogs: 55, gm: 75 },
]

export const defaultChartData02 = [
  {
    date: "2010-03-01",
    y: 100,
    y2: 100,
    y3: 140,
    y4: 160,
    animal: "dog",
  },
  {
    date: "2010-03-02",
    y: 60,
    y2: 120,
    y3: 140,
    y4: 160,
    animal: "dog",
  },
  {
    date: "2010-03-03",
    y: 70,
    y2: 190,
    y3: 140,
    y4: 160,
    animal: "frog",
  },
  {
    date: "2010-03-04",
    y: 30,
    y2: 80,
    y3: 150,
    y4: 130,
    animal: "cat",
  },
  {
    date: "2010-03-05",
    y: 2,
    y2: 7,
    y3: 140,
    y4: 160,
    animal: "cat",
  },
]
export const XAXISTYPE = [
  "default",
  "category",
  "Linear",
  "Logarithmic",
  "Time",
]

export const COLOR_SCHEME = [
  "#165dff",
  "#0fc6c2",
  "#fac819",
  "#00b42a",
  "#9fdb1d",
  "#f18f65",
  "#f16565",
  "#da56ef",
  "#7965f1",
]

export const defaultChartJsonObj = {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
}
export const defaultChartJsonData = JSON.stringify(defaultChartJsonObj)

const defaultChartOptionsData = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: false,
      position: "left" as const,
    },
  },
}
export const defaultOptionsJson = JSON.stringify(defaultChartOptionsData)
