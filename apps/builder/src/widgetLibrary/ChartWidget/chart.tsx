import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  ChartData,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  DoughnutController,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PieController,
  PointElement,
  RadarController,
  RadialLinearScale,
  ScatterController,
  Title,
  Tooltip,
} from "chart.js"
import { get, groupBy as groupByFunc } from "lodash-es"
import { FC, useMemo, useRef } from "react"
import { Doughnut, Pie, Radar, Chart as ReactChart } from "react-chartjs-2"
import { globalColor, illaPrefix } from "@illa-design/react"
import { CHART_COLOR_TYPE_CONFIG } from "@/page/App/components/InspectPanel/PanelSetters/ChartSetter/chartDatasetsSetter/listItem"
import { formatDataAsObject } from "@/utils/formatData"
import {
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/ChartWidget/interface"
import {
  formatData,
  getDateFormatLabel,
  typeWithDiffColor,
  typeWithNoAxis,
} from "@/widgetLibrary/ChartWidget/utils"
import { chartContainerStyle } from "./style"

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
  /** Doughnut **/
  DoughnutController,
  /** Radar **/
  RadarController,
  RadialLinearScale,
  /**Other**/
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Filler,
)

export const Chart: FC<ChartWidgetProps> = (props) => {
  const {
    datasets,
    xAxis,
    chartType,
    chartTitle,
    xAxisName,
    yAxisName,
    direction,
    isStack,
    legendPosition,
    gridLineColor,
    xType,
    dateFormat,
  } = props
  const data = useMemo(() => {
    let curXAis = xAxis
    if (xType === "time") {
      curXAis = xAxis.map((x) => getDateFormatLabel(x, dateFormat))
    }
    return {
      labels: curXAis,
      datasets,
    }
  }, [datasets, dateFormat, xAxis, xType])

  const options: ChartOptions = useMemo(() => {
    const horizontalColor =
      !typeWithNoAxis(chartType) && direction === "y"
        ? gridLineColor
        : undefined
    const verticalColor =
      !typeWithNoAxis(chartType) && direction === "x"
        ? gridLineColor
        : undefined
    return {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: !typeWithNoAxis(chartType) ? direction : undefined,
      scales: {
        x: {
          display: !typeWithNoAxis(chartType),
          stacked: !typeWithNoAxis(chartType) && isStack,
          title: {
            display: !!xAxisName,
            text: xAxisName,
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
            },
          },
          grid: {
            color:
              horizontalColor || globalColor(`--${illaPrefix}-grayBlue-09`),
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
          display: !typeWithNoAxis(chartType),
          stacked: !typeWithNoAxis(chartType) && isStack,
          title: {
            display: !!yAxisName,
            text: yAxisName,
            color: globalColor(`--${illaPrefix}-grayBlue-02`),
            font: {
              size: 12,
            },
          },
          grid: {
            color: verticalColor || globalColor(`--${illaPrefix}-grayBlue-09`),
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
          display: legendPosition !== "hidden",
          labels: {
            boxWidth: 20,
            boxHeight: 4,
          },
          position: legendPosition !== "hidden" ? legendPosition : undefined,
        },
      },
    }
  }, [
    chartTitle,
    chartType,
    direction,
    gridLineColor,
    isStack,
    legendPosition,
    xAxisName,
    yAxisName,
  ])

  const chartRef = useRef()

  const finalType = useMemo(() => {
    if (chartType === "scatter") {
      return "line"
    }
    return chartType
  }, [chartType])

  switch (finalType) {
    default:
    case "bar":
    case "line":
      return (
        <ReactChart
          ref={chartRef}
          type={finalType}
          datasetIdKey="id"
          data={data}
          options={options}
        />
      )
    case "radar":
      return (
        <Radar
          datasetIdKey="id"
          data={data as ChartData<"radar", number | null[], string>}
          options={options as ChartOptions<"radar">}
        />
      )
    case "doughnut":
      return (
        <Doughnut
          datasetIdKey="id"
          data={data as ChartData<"doughnut", number | null[], string>}
          options={options as ChartOptions<"doughnut">}
        />
      )
    case "pie":
      return (
        <Pie
          datasetIdKey="id"
          data={data as ChartData<"pie", number | null[], string>}
          options={options as ChartOptions<"pie">}
        />
      )
  }
}

export const ChartWidget: FC<WrappedChartProps> = (props) => {
  const {
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
    backgroundColor = "white",
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
        if (groupBy || typeWithDiffColor(chartType)) {
          finalColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          )
        }
        if (chartType === "radar") {
          finalColor = `${finalColor}77`
        }
        let data: number[] = []
        if (!groupBy || typeWithNoAxis(chartType)) {
          const formatDataSources = groupByFunc(realDataSourceArray, xAxis)
          data = formatData(
            formatDataSources,
            datasetValues,
            aggregationMethod,
            realXAxis,
          )
        } else {
          const groupedData = groupByFunc(realDataSourceArray, groupBy)

          const relationData: Record<string, any> = {}
          Object.keys(groupedData).forEach((key) => {
            const value = groupedData[key]

            const groupData = groupByFunc(value, xAxis)

            const formatDataArray = formatData(
              groupData,
              datasetValues,
              aggregationMethod,
              realXAxis,
            )
            relationData[key] = formatDataArray
          })

          const groupByColor = get(
            CHART_COLOR_TYPE_CONFIG,
            color,
            CHART_COLOR_TYPE_CONFIG["illa-preset"],
          ) as string[]

          return Object.keys(relationData).map((k, i) => {
            const value = relationData[k]
            return {
              label:
                Object.keys(groupedData).length > 1
                  ? `${datasetName}(${k})`
                  : datasetName,
              data: Object.values(value) as number[],
              type,
              borderColor: groupByColor[i % groupByColor.length],
              backgroundColor: groupByColor[i % groupByColor.length],
            }
          })
        }
        let finalVal = {
          label: datasetName,
          data: data,
          type,
          borderColor: finalColor,
          backgroundColor: finalColor,
          fill: false,
        }
        if (chartType === "radar") {
          finalVal["fill"] = true
        }
        return finalVal
      })
      .flat()
    if (typeWithNoAxis(chartType)) {
      return result.length > 0 ? [result[result.length - 1]] : []
    } else {
      return result
    }
  }, [chartType, datasets, groupBy, realDataSourceArray, realXAxis, xAxis])

  return (
    <div css={chartContainerStyle(backgroundColor)}>
      <Chart
        {...props}
        xAxis={realXAxis}
        datasets={realDatasets}
        chartType={chartType}
        chartTitle={chartTitle}
        xAxisName={xAxisName}
        yAxisName={yAxisName}
      />
    </div>
  )
}

ChartWidget.displayName = "ChartWidget"
export default ChartWidget
