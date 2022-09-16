import { FC, useMemo } from "react"
import {
  Chart as ChartJS,
  LineElement,
  LineController,
  PointElement,
  BarElement,
  BarController,
  PieController,
  ArcElement,
  ScatterController,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartDataset,
} from "chart.js"
import { Chart as ReactChart } from "react-chartjs-2"
import {
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/Chart/interface"
import { formatDataAsObject } from "@/utils/formatData"
import { get, groupBy as groupByFunc } from "lodash"
import { globalColor, illaPrefix } from "@illa-design/theme"

ChartJS.register(
  /** Bar chart**/
  BarElement,
  BarController,
  /** Line chart**/
  LineElement,
  LineController,
  PointElement,
  /** Pie chart**/
  PieController,
  ArcElement,
  /** Scatter chart**/
  ScatterController,
  /**Other**/
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
)

export const Chart: FC<ChartWidgetProps> = props => {
  const { datasets, xAxis, chartType, chartTitle, xAxisName, yAxisName } = props

  const data = useMemo(() => {
    return {
      labels: xAxis,
      datasets,
    }
  }, [datasets, xAxis])

  const options: ChartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          display: true,
          title: {
            display: !!xAxisName,
            text: xAxisName,
          },
        },
        y: {
          display: true,
          title: {
            display: !!yAxisName,
            text: yAxisName,
          },
        },
      },
      plugins: {
        title: {
          display: !!chartTitle,
          text: chartTitle,
          color: globalColor(`--${illaPrefix}-grayBlue-02`),
          font: {
            size: 16,
          },
        },
      },
    }
  }, [chartTitle, xAxisName, yAxisName])

  return (
    <ReactChart
      type={chartType || "bar"}
      datasetIdKey="id"
      data={data}
      options={options}
    />
  )
}

export const ChartWidget: FC<WrappedChartProps> = props => {
  const {
    w,
    h,
    unitW,
    unitH,
    dataSource,
    dataSourceJS,
    dataSourceMode,
    chartType,
    xAxis,
    groupBy,
    chartTitle,
    xAxisName,
    yAxisName,
    datasets,
  } = props

  const realDataSourceArray = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? dataSourceJS : []
    }
    return dataSource ? dataSource : []
  }, [dataSource, dataSourceJS, dataSourceMode])

  const realDataSourceObject = useMemo(() => {
    if (dataSourceMode === "dynamic") {
      return dataSourceJS ? formatDataAsObject(dataSourceJS) : {}
    }
    return dataSource ? formatDataAsObject(dataSource) : {}
  }, [dataSource, dataSourceJS, dataSourceMode])

  const realXAxis = useMemo(() => {
    const xAxisArray = get(realDataSourceObject, xAxis, [])
    if (Array.isArray(xAxisArray)) {
      return Array.from(new Set(xAxisArray)) as string[]
    }
    return []
  }, [realDataSourceObject, xAxis])

  const formatDataSources = useMemo(() => {
    return groupByFunc(realDataSourceArray, xAxis)
  }, [realDataSourceArray, xAxis])

  const realDatasets: ChartDataset[] = useMemo(() => {
    if (!Array.isArray(datasets)) return []
    return datasets.map(dataset => {
      const data: number[] = []
      const { datasetValues, type, datasetName, color } = dataset
      Object.keys(formatDataSources).forEach(x => {
        let sum = 0
        const v = formatDataSources[x]
        v.forEach(vk => {
          sum += Number(get(vk, datasetValues, 0))
        })
        data.push(sum)
      })
      return {
        label: datasetName,
        data: data,
        type,
        backgroundColor: color,
      }
    })
  }, [datasets, formatDataSources])

  const groupByDatasets = useMemo(() => {
    if (groupBy && realDataSourceObject.hasOwnProperty(groupBy)) {
      return realDatasets
    }
    return realDatasets
  }, [realDatasets, groupBy, realDataSourceObject])

  return (
    <Chart
      w={w}
      h={h}
      unitH={unitH}
      unitW={unitW}
      xAxis={realXAxis}
      datasets={realDatasets}
      chartType={chartType}
      chartTitle={chartTitle}
      xAxisName={xAxisName}
      yAxisName={yAxisName}
    />
  )
}

ChartWidget.displayName = "ChartWidget"
