export type ChartType = "Bar" | "Line" | "Pie" | "ScatterPlot"
export type LegendPosition = "top" | "bottom" | "right" | "left" | "hidden"
export type DatasetConfig = {
  name?: string
  values?: (number | null)[]
  type?: ChartType
  lineColor?: string
  toolTip?: string
}

export interface WrappedChartProps {
  data?: object[]
  title?: string
  type?: ChartType
  xAxisValues?: string[]
  groupBy?: string
  datasets?: DatasetConfig[]
  xTitle?: string
  xType?: string
  yTitle?: string
  chartJson?: string
  legendPosition?: LegendPosition
  initConfigByData?: (
    xAxis?: string[],
    groupBy?: string[],
    datasets?: DatasetConfig[],
    dataMap?: { [key: string]: any },
  ) => void
}

export type DATAType = {
  xAxis?: string[]
  groupBy?: string[]
  datasets?: DatasetConfig[]
  dataMap?: { [key: string]: any }
}

export const testData = [
  {
    date: "2010-03-01",
    y: 10,
    y2: 10,
    animal: "dog",
  },
  {
    date: "2010-03-02",
    y: 6,
    y2: 12,
    animal: "dog",
  },
  {
    date: "2010-03-03",
    y: 7,
    y2: 19,
    animal: "frog",
  },
  {
    date: "2010-03-04",
    y: 3,
    y2: 8,
    animal: "cat",
  },
  {
    date: "2010-03-05",
    y: 2,
    y2: 7,
    animal: "cat",
  },
]

const testJsonObj = {
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
export const testJson = JSON.stringify(testJsonObj)
