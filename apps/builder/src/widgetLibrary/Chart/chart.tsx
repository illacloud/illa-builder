import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js"
import { get, groupBy as groupByFunc } from "lodash"
import { FC, useMemo, useRef } from "react"
import { Pie, Chart as ReactChart } from "react-chartjs-2"
import { globalColor, illaPrefix } from "@illa-design/react"
import { CHART_COLOR_TYPE_CONFIG } from "@/page/App/components/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { formatDataAsObject } from "@/utils/formatData"
import {
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/Chart/interface"
import { formatData, rotateGroupByData } from "@/widgetLibrary/Chart/utils"

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

export const Chart: FC<ChartWidgetProps> = (props) => {
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
          display: chartType !== "pie",
          title: {
            display: !!xAxisName,
            text: xAxisName,
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
            },
          },
          grid: {
            color: globalColor(`--${illaPrefix}-grayBlue-09`),
            borderColor: globalColor(`--${illaPrefix}-grayBlue-09`),
            tickColor: globalColor(`--${illaPrefix}-grayBlue-04`),
          },
          ticks: {
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
              weight: "bold",
            },
          },
        },
        y: {
          display: chartType !== "pie",
          title: {
            display: !!yAxisName,
            text: yAxisName,
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
            },
          },
          grid: {
            color: globalColor(`--${illaPrefix}-grayBlue-09`),
            borderColor: globalColor(`--${illaPrefix}-grayBlue-09`),
            tickColor: globalColor(`--${illaPrefix}-grayBlue-04`),
          },
          ticks: {
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
              weight: "bold",
            },
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
        legend: {
          labels: {
            boxWidth: 20,
            boxHeight: 4,
          },
        },
      },
    }
  }, [chartTitle, chartType, xAxisName, yAxisName])

  const chartRef = useRef()

  const finalType = useMemo(() => {
    if (chartType === "scatter") {
      return "line"
    }
    return chartType
  }, [chartType])

  if (finalType === "pie") {
    return (
      <Pie
        datasetIdKey="id"
        data={data as ChartData<"pie", number | null[], string>}
        options={options as ChartOptions<"pie">}
      />
    )
  }

  return (
    <ReactChart
      ref={chartRef}
      type={finalType}
      datasetIdKey="id"
      data={data}
      options={options}
    />
  )
}

export const ChartWidget: FC<WrappedChartProps> = (props) => {
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
    const result = datasets
      .filter((dataset) => {
        if (dataset.isHidden == undefined) return true
        return !dataset.isHidden
      })
      .map((dataset) => {
        const { datasetValues, type, datasetName, color, aggregationMethod } =
          dataset
        let finalColor: string | string[] = color
        if (groupBy || chartType === "pie") {
          finalColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          )
        }
        let data: number[] = []
        if (!groupBy || chartType === "pie") {
          data = formatData(formatDataSources, datasetValues, aggregationMethod)
        } else {
          let keys: string[] = []
          const r1 = Object.keys(formatDataSources).map((key) => {
            const value = formatDataSources[key]
            const groupData = groupByFunc(value, groupBy)
            keys.push(...Object.keys(groupData))
            return formatData(groupData, datasetValues, aggregationMethod)
          })
          const rotate = rotateGroupByData(r1)
          let point = 0
          const groupByColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          ) as string[]
          if (rotate.length === 1) {
            return {
              label: `${datasetName}`,
              data: rotate[0],
              type,
              borderColor: groupByColor[0],
              backgroundColor: groupByColor[0],
            }
          }
          return rotate.map((d, i) => {
            return {
              label: `${datasetName}(${keys[point++]})`,
              data: d,
              type,
              borderColor: groupByColor[i % groupByColor.length],
              backgroundColor: groupByColor[i % groupByColor.length],
            }
          })
        }

        data = formatData(formatDataSources, datasetValues, aggregationMethod)
        return {
          label: datasetName,
          data: data,
          type,
          borderColor: finalColor,
          backgroundColor: finalColor,
        }
      })
      .flat()
    if (chartType === "pie") {
      return result.length > 0 ? [result[result.length - 1]] : []
    } else {
      return result
    }
  }, [chartType, datasets, formatDataSources, groupBy])

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
